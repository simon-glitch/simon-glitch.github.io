
import numpy as np
a = np.array
p = np.linalg.matrix_power

"""
c -> v,
v -> v,
"""
m_not = [
    [[1]],
    [[-1]],
]
m_and = [
    [[]],
    [[0,0], [1,0]],
]


v_c = [1]
v_v = [1, 0]

def compose(m_i):
    l_c = len(v_c)
    l_v = len(v_v)
    l = l_v + l_c
    m_o = []
    for _ in range(l):
        m_o.append([0] * l)
    
    for i in range(l):
        for j in range(l):
            # c,v -> c
            if(i < l_c):
                # c -> same c
                if(i == j):
                    m_o[i][j] = 1
            # c,v -> v
            elif(i - l_c < len(m_i[0])):
                # c -> v
                if(j < l_c):
                    if(j - l_c < len(m_i[0][i - l_c])):
                        m_o[i][j] = m_i[0][i - l_c][j - l_c]
                # v -> v
                elif(
                    i - l_c < len(m_i[1]) and
                    j - l_c < len(m_i[1][i - l_c])
                ):
                    m_o[i][j] = m_i[1][i - l_c][j - l_c]
            else:
                # default is keep vars
                if(i == j):
                    m_o[i][j] = 1
    return m_o

v_a = a(v_v + v_c)
m_not_a = compose(m_not)
print(v_a)
print(m_not_a)
print(m_not_a @ v_a)
print(p(m_not_a, 2) @ v_a)


