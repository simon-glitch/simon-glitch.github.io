#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'knightlOnAChessboard' function below.
 *
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts INTEGER n as parameter.
 */

int k_dist(int ki, int kj, int n){
    vector<vector<vector<vector<int>>>> d;
    // fill with infs
    for(int i = 0; i < n; i++){
        d.push_back(vector<vector<vector<int>>>());
        for(int j = 0; j < n; j++){
            d[i].push_back(vector<vector<int>>());
            for(int k = 0; k < n; k++){
                d[i][j].push_back(vector<int>(n));
                for(int l = 0; l < n; l++){
                    d[i][j][k][l] = 0x7fffffff;
                }
            }
        }
    }
    
    for(int i = 0; i < n; i++){
        for(int j = 0; j < n; j++){
            cout << "checking ";
            cout << i;
            cout << " ";
            cout << j;
            cout << "\n";
            // set all 8 valid knight moves to 1
            // up ki, left kj
            if(i > ki && j > kj){
                d[i][j][i - ki][j - kj] = 1;
            }
            // up kj, left ki
            if(i > kj && j > ki){
                d[i][j][i - kj][j - ki] = 1;
            }
            // up ki, right kj
            if(i > ki && j < n - kj){
                d[i][j][i - ki][j + kj] = 1;
            }
            // up kj, right ki
            if(i > kj && j < n - ki){
                d[i][j][i - kj][j + ki] = 1;
            }
            // down ki, left kj
            if(i < n - ki && j > kj){
                d[i][j][i + ki][j - kj] = 1;
            }
            // down kj, left ki
            if(i < n - kj && j > ki){
                d[i][j][i + kj][j - ki] = 1;
            }
            // down ki, right kj
            if(i < n - ki && j < n - kj){
                d[i][j][i + ki][j + kj] = 1;
            }
            // down kj, right ki
            if(i < n - kj && j < n - ki){
                d[i][j][i + kj][j + ki] = 1;
            }
        }
    }
    
    // all pairs shortest path from CS212
    for(int h = 0; h < n*n; h++){
        // don't even use h
        // for every tile...
        for(int i = 1; i < n; i++){
            for(int j = 1; j < n; j++){
                // for every tile it can reach...
                for(int k = 0; k < n; k++){
                    for(int l = 0; l < n; l++){
                        if(d[i][j][k][l] == 0x7fffffff) continue;
                        // for every tile THOSE can reach...
                        for(int ii = 0; ii < n; ii++){
                            for(int jj = 0; jj < n; jj++){
                                if(d[k][l][ii][jj] == 0x7fffffff) continue;
                                d[i][j][k][l] = min(
                                    d[i][j][ii][ii],
                                    d[i][j][k][l] + d[k][l][ii][jj]
                                );
                            }
                        }
                    }
                }
            }
        }
    }
    
    // here's the easy part
    return d[0][0][n-1][n-1];
}

// O(n^10) - now that's efficient!
vector<vector<int>> knightlOnAChessboard(int n) {
    vector<vector<int>> res;
    for(int i = 1; i < n; i++){
        res.push_back(vector<int>(n));
        for(int j = 1; j < n; j++){
            if(i > j){
                res[i - 1][j - 1] = res[j - 1][i - 1];
            }
            else{
                res[i - 1][j - 1] = k_dist(i, j, n);
            }
        }
    }
    return res;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string n_temp;
    getline(cin, n_temp);

    int n = stoi(ltrim(rtrim(n_temp)));

    vector<vector<int>> result = knightlOnAChessboard(n);

    for (size_t i = 0; i < result.size(); i++) {
        for (size_t j = 0; j < result[i].size(); j++) {
            fout << result[i][j];

            if (j != result[i].size() - 1) {
                fout << " ";
            }
        }

        if (i != result.size() - 1) {
            fout << "\n";
        }
    }

    fout << "\n";

    fout.close();

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    s.erase(
        s.begin(),
        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    );

    return s;
}

string rtrim(const string &str) {
    string s(str);

    s.erase(
        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
        s.end()
    );

    return s;
}
