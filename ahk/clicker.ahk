#Requires AutoHotkey v2.0

class globals {
    static i := 0
    static n := 1000000
    static d := 10
    static p := 0
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
    SetTimer(click_f, globals.d * 2**globals.p)
}

!Esc::
{
    Suspend
    Persistent 0
    Exit(0)
}

#HotIf globals.i < globals.n
PgDn::
{
    globals.i := globals.n
}

#HotIf
!Left::
{
    globals.p := globals.p + 1
}

!Right::
{
    globals.p := globals.p - 1
}

