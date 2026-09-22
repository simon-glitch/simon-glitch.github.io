#Requires AutoHotkey v2.0+
#SingleInstance Force

; EMERGENCY TRIGGER (Alt + A + S)
#HotIf GetKeyState("Alt", "P")
a & s::
{
    ; 1. Load the Windows Wireless LAN API directly into RAM
    hWlan := DllCall("LoadLibrary", "Str", "wlanapi.dll", "Ptr")
    if (!hWlan)
        return

    dwMaxVersion := 2
    dwCurVersion := 0
    hClient := 0

    ; 2. Open a direct hardware communication handle to your Wi-Fi card
    if (DllCall("wlanapi\WlanOpenHandle", "UInt", dwMaxVersion, "Ptr", 0, "UInt*", &dwCurVersion, "Ptr*", &hClient) == 0) {
        pIfList := 0
        
        ; 3. Enumerate all wireless interfaces (Locates your Realtek card)
        if (DllCall("wlanapi\WlanEnumInterfaces", "Ptr", hClient, "Ptr", 0, "Ptr*", &pIfList) == 0) {
            dwNumberOfItems := NumGet(pIfList, 0, "UInt")
            
            ; Loop through every wireless adapter detected
            Loop dwNumberOfItems {
                ; Calculate memory offset pointer to find the unique Interface GUID
                ; The GUID starts at byte index 8 inside the interface list array structure
                ifIndex := (A_Index - 1) * 532
                pGUID := pIfList + 8 + ifIndex
                
                ; 4. FORCE HARDWARE DISCONNECT: Instantly drop the link to the mobile hotspot
                DllCall("wlanapi\WlanDisconnect", "Ptr", hClient, "Ptr", pGUID, "Ptr", 0)
            }
            
            ; Hold the connection down for 1.5 seconds to force Chrome/Java to dump memory
            Sleep(1500)
            
            ; 5. FORCE RESCAN: Instruct the Realtek card to wake up and fetch the hotspot again
            Loop dwNumberOfItems {
                ifIndex := (A_Index - 1) * 532
                pGUID := pIfList + 8 + ifIndex
                DllCall("wlanapi\WlanScan", "Ptr", hClient, "Ptr", pGUID, "Ptr", 0, "Ptr", 0, "Ptr", 0)
            }
            
            ; Free the allocated list structure memory pointers cleanly
            DllCall("wlanapi\WlanFreeMemory", "Ptr", pIfList)
        }
        
        ; Close the system hardware handle
        DllCall("wlanapi\WlanCloseHandle", "Ptr", hClient, "Ptr", 0)
    }
    
    ; Unload the library from the working thread footprint
    DllCall("FreeLibrary", "Ptr", hWlan)
}
#HotIf
