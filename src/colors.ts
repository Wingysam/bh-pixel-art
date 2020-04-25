// Copied + cleaned up from Skeevatron
export const recipes = `
R	N	N	194	25	4
Y	N	N	231	212	32
G	N	N	6	225	107
C	N	N	0	219	237
B	N	N	0	64	180
P	N	N	127	13	153
W	N	N	255	255	255
K	N	N	0	0	0
R	Y	N	220	120	24
R	G	N	96	131	51
R	C	N	94	126	121
R	B	N	104	46	96
R	P	N	159	20	79
R	W	N	227	141	124
R	K	N	97	14	0
R	R	Y	205	89	16
R	R	G	134	94	33
R	R	C	135	91	78
R	R	B	129	39	64
R	R	W	215	102	84
R	R	P	163	26	56
R	R	K	129	15	4
R	Y	G	143	156	50
R	Y	C	143	153	100
R	G	C	65	160	118
R	Y	B	145	101	76
R	G	B	65	109	94
R	C	B	62	106	145
R	Y	P	185	84	66
R	G	P	103	92	88
R	C	P	105	89	136
R	B	P	105	36	119
R	Y	W	226	169	102
R	G	W	151	170	125
R	C	W	152	171	169
R	B	W	150	117	146
R	P	W	188	100	140
R	Y	K	140	79	16
R	G	K	66	85	40
R	C	K	64	83	81
R	B	K	66	32	59
R	P	K	104	14	50
R	W	K	153	93	85
R	Y	Y	223	150	22
Y	Y	G	153	217	68
Y	Y	C	160	214	103
Y	Y	B	156	163	86
Y	Y	P	198	144	80
Y	Y	W	244	223	114
Y	Y	K	160	137	31
Y	G	N	114	224	65
Y	C	N	119	215	144
Y	B	N	116	139	111
Y	P	N	176	113	95
Y	W	N	244	231	153
Y	K	N	116	106	21
Y	G	C	76	221	126
Y	G	B	78	169	102
Y	G	P	118	154	108
Y	G	W	162	235	130
Y	G	K	83	149	51
Y	C	B	84	167	157
Y	C	P	117	149	144
Y	C	W	164	232	175
Y	C	K	76	145	91
Y	B	P	119	99	127
Y	B	W	161	175	160
Y	B	K	79	92	75
Y	P	W	205	162	155
Y	P	K	117	77	65
Y	W	K	167	158	101
R	G	G	70	165	73
Y	G	G	82	225	83
G	G	C	0	227	148
G	G	B	0	176	129
G	G	P	40	156	121
G	G	W	90	238	154
G	G	K	2	154	69
G	C	N	0	223	167
G	B	N	5	148	146
G	P	N	63	121	132
G	W	N	128	245	177
G	K	N	6	115	48
G	C	B	2	171	176
G	C	P	46	153	171
G	C	W	84	235	200
G	C	K	0	150	115
G	B	P	41	104	147
G	B	W	88	182	181
G	B	K	2	99	92
G	P	W	126	167	171
G	P	K	43	80	86
G	W	K	90	161	121
R	C	C	63	159	158
Y	C	C	77	217	172
G	C	C	5	224	194
C	C	B	1	171	222
C	C	P	43	153	214
C	C	W	86	233	243
C	C	K	0	147	164
C	B	N	1	146	211
C	P	N	59	117	199
C	W	N	124	238	248
C	K	N	1	112	119
C	B	P	49	97	195
C	B	W	84	183	222
C	B	K	9	93	140
C	P	W	123	164	218
C	P	K	38	79	133
C	W	K	83	160	166
B	P	W	128	113	204
B	P	K	43	28	111
B	W	K	85	105	140
R	B	B	70	53	123
Y	B	B	78	115	134
G	B	B	0	121	150
C	B	B	0	121	203
B	B	P	42	51	172
B	B	W	83	129	206
B	B	K	11	44	121
B	P	N	62	39	171
B	W	N	132	163	220
B	K	N	5	33	96
P	W	N	184	139	198
P	P	K	78	11	104
B	P	P	81	32	158
C	P	P	81	83	184
Y	P	P	158	81	117
G	P	P	80	85	140
R	P	P	148	20	105
P	P	W	161	96	188
P	W	K	128	90	139
P	K	N	60	9	78
R	K	K	67	9	5
Y	K	K	79	70	11
G	K	K	1	76	35
C	K	K	1	74	83
B	K	K	1	22	65
P	K	K	40	3	54
W	K	K	85	85	85
G	W	W	169	248	201
Y	W	W	248	239	182
C	W	W	166	240	253
R	W	W	237	178	172
B	W	W	172	191	233
P	W	W	212	172	222
W	W	K	170	170	170
W	K	N	125	125	125
`.trim()
.split('\n')
.map(line => {
    const cols = line.split('\t')
    const colorName = cols.slice(0, 3).join('').replace(/N/g, '')
    const colorParts = cols.slice(3).map(Number)
    const hexColor = `#${colorParts[0].toString(16).padStart(2, '0')}${colorParts[1].toString(16).padStart(2, '0')}${colorParts[2].toString(16).padStart(2, '0')}`
    return [colorName, hexColor] as [string, string]
})
.reduce((acc, [name, hex]) => {
    acc[name] = hex
    return acc
}, {} as Record<string, string>)

const colorLinkMap: Record<string, string> = {
    K: 'images/black.png',
    W: 'images/white.png',
    R: 'images/red.png',
    Y: 'images/yellow.png',
    B: 'images/blue.png',
    C: 'images/aqua.png',
    G: 'images/green.png',
    P: 'images/purple.png'
}

export function getImageLinks(color: string) {
    return color.split('')
        .map(color => colorLinkMap[color])
}
