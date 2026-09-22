#ifndef UNICODE
#define UNICODE
#endif

#include <windows.h>
#include <wlanapi.h> // <-- Talks directly to the physical Wi-Fi hardware radio
#include <iostream>

#pragma comment(lib, "wlanapi.lib")

int main() {
    HANDLE hClient = NULL;
    DWORD dwMaxVersion = 2;
    DWORD dwCurVersion = 0;
    
    // 1. Open a direct hardware channel to the Windows WLAN framework
    if (WlanOpenHandle(dwMaxVersion, NULL, &dwCurVersion, &hClient) != ERROR_SUCCESS) {
        return 1;
    }

    PWLAN_INTERFACE_INFO_LIST pIfList = NULL;
    
    // 2. Fetch the physical Wi-Fi card (your Realtek Adapter)
    if (WlanEnumInterfaces(hClient, NULL, &pIfList) == ERROR_SUCCESS) {
        for (DWORD i = 0; i < pIfList->dwNumberOfItems; i++) {
            WLAN_INTERFACE_INFO IfInfo = pIfList->InterfaceInfo[i];
            
            // 3. FORCE DISCONNECT: Forcefully sever the radio link to the hotspot instantly
            WlanDisconnect(hClient, &IfInfo.InterfaceGuid, NULL);
        }

        // 4. Hold the connection dead for 1.5 seconds to force Chrome/Java to collapse their RAM queues
        Sleep(1500);

        // 5. Re-scan to automatically catch and hook back onto the hotspot
        for (DWORD i = 0; i < pIfList->dwNumberOfItems; i++) {
            WLAN_INTERFACE_INFO IfInfo = pIfList->InterfaceInfo[i];
            WlanScan(hClient, &IfInfo.InterfaceGuid, NULL, NULL, NULL);
        }
    }

    // Clean up memory signatures
    if (pIfList != NULL) {
        WlanFreeMemory(pIfList);
    }
    WlanCloseHandle(hClient, NULL);
    
    return 0;
}

/*
gcc -O3 KillSockets.cpp -o KillSockets -lwlanapi
*/
