#Requires AutoHotkey v2.0

class globals {
    static i := 0
    static n := 2000
}


click_f(){
    Click
    globals.i := globals.i + 1
    if(globals.i >= globals.n){
        SetTimer(click_f, 0)
    }
}

PgUp::
{
    globals.i := 0
    SetTimer(click_f, 1)
}

!Esc::
{
    Exit(0)
}

#HotIf globals.i < globals.n
PgDn::
{
    globals.i := globals.n
}
