--
-- PostgreSQL database dump
--

-- Dumped from database version 10.13 (Ubuntu 10.13-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.13 (Ubuntu 10.13-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id character varying(255) NOT NULL,
    text character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "parentId" character varying(255),
    "postId" character varying(255),
    "userId" character varying(255)
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    id character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" character varying(255),
    "postId" character varying(255)
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id character varying(255) NOT NULL,
    blah character varying(255),
    title character varying(255),
    description text,
    published boolean DEFAULT true,
    karma integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" character varying(255),
    "tagId" character varying(255)
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id character varying(255) NOT NULL,
    text character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(255) NOT NULL,
    email character varying(255),
    "userName" character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    "imageUrl" character varying(255),
    password character varying(255),
    department character varying(255),
    college character varying(255),
    year integer,
    badges character varying(255)[],
    karma integer DEFAULT 0,
    "viaGoogle" boolean DEFAULT false,
    "registeredViaLoginViaGoogle" boolean DEFAULT false,
    "registeredViaRegisterViaGoogle" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20200625180605-test.js
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, text, "createdAt", "updatedAt", "parentId", "postId", "userId") FROM stdin;
dQqruqDc6	Nice	2020-06-29 16:02:37.359+05:30	2020-06-29 16:19:37.359+05:30	\N	eSj7QK86g	DRt1tdYKq
spPgr4LLG	This is my first post	2020-06-28 16:19:37.359+05:30	2020-06-29 16:19:37.359+05:30	\N	2z6RMG4sj	DRt1tdYKq
wIanPYFkp	Very cool	2020-06-28 16:19:37.359+05:30	2020-06-29 16:19:37.359+05:30	\N	2z6RMG4sj	E9cFrkqrV
VJ3A2xGvg	Very cool	2020-06-28 16:19:37.359+05:30	2020-06-29 16:19:37.359+05:30	\N	dVDE5jntE	E9cFrkqrV
IIKjpY1ZB	Thank you!	2020-06-29 16:02:37.359+05:30	2020-06-29 16:19:37.359+05:30	dQqruqDc6	eSj7QK86g	E9cFrkqrV
BE1MRTfFc	This is great. How did you do it?	2020-06-29 16:02:37.359+05:30	2020-06-29 16:19:37.359+05:30	spPgr4LLG	2z6RMG4sj	WK1CCqJGU
5vBR11Qvf	By myself. And a lot of Horlicks. I am sponsored by them to be honest.	2020-06-29 16:02:37.359+05:30	2020-06-29 16:19:37.359+05:30	spPgr4LLG	2z6RMG4sj	DRt1tdYKq
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (id, "createdAt", "updatedAt", "userId", "postId") FROM stdin;
srw9HBUtN	2020-06-29 16:19:37.353+05:30	2020-06-29 16:19:37.353+05:30	WK1CCqJGU	q3Z9Ngzkf
LjLvWCwr3	2020-06-29 16:19:37.353+05:30	2020-06-29 16:19:37.353+05:30	DRt1tdYKq	q3Z9Ngzkf
Xd3YJyZ2S	2020-06-29 16:19:37.353+05:30	2020-06-29 16:19:37.353+05:30	WK1CCqJGU	2z6RMG4sj
T23yv6nu1	2020-06-29 16:19:37.353+05:30	2020-06-29 16:19:37.353+05:30	DRt1tdYKq	dVDE5jntE
ReZ2DwTDk	2020-06-29 16:19:37.353+05:30	2020-06-29 16:19:37.353+05:30	WK1CCqJGU	LsqISRV9c
vrYqbBVvq	2020-06-29 16:19:37.353+05:30	2020-06-29 16:19:37.353+05:30	DRt1tdYKq	TSiIcYKFt
QkHwLxMuU	2020-06-29 16:19:37.353+05:30	2020-06-29 16:19:37.353+05:30	WK1CCqJGU	kviwm6F1y
GsaEfnZGN	2020-06-29 16:19:37.353+05:30	2020-06-29 16:19:37.353+05:30	L7HNJLHpm	2z6RMG4sj
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, blah, title, description, published, karma, "createdAt", "updatedAt", "userId", "tagId") FROM stdin;
eSj7QK86g	\N	I've Been Making a Video Series about Building a 16-bit Virtual Machine.	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	18	2020-06-29 09:19:37.347+05:30	2020-06-29 16:19:37.348+05:30	E9cFrkqrV	ejfGssvbJ
2z6RMG4sj	\N	Generators in Rust, C++20, Go, and More	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	4	2020-06-29 06:19:37.347+05:30	2020-06-29 16:19:37.348+05:30	DRt1tdYKq	ejfGssvbJ
dVDE5jntE	\N	The Colorful Game of Life - a variant of Conway's Game of Life	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	f	11	2020-06-22 16:19:37.347+05:30	2020-06-29 16:19:37.348+05:30	WK1CCqJGU	mATjSBKwv
LsqISRV9c	\N	Feel-O-Meter (visualize the dominant emotions in your Spotify playlists based on lyrics)	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	10	2020-06-12 16:19:37.347+05:30	2020-06-29 16:19:37.348+05:30	WK1CCqJGU	zDG4S2uZL
TSiIcYKFt	\N	What a typical 100% Serverless Architecture looks like in AWS!	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	3	2020-06-12 16:19:37.347+05:30	2020-06-29 16:19:37.348+05:30	DRt1tdYKq	TdEPcidQK
kviwm6F1y	\N	One	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	0	2020-06-02 16:19:37.348+05:30	2020-06-29 16:19:37.348+05:30	WK1CCqJGU	zDG4S2uZL
q3Z9Ngzkf	\N	I built an open-source personal assistant powered by an artificial neural network in Go	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	1	2020-06-29 16:17:37.348+05:30	2020-06-29 16:19:37.348+05:30	E9cFrkqrV	zDG4S2uZL
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, text, "createdAt", "updatedAt") FROM stdin;
XNaAIBsQu	Python	2020-06-29 16:19:36.319+05:30	2020-06-29 16:19:36.319+05:30
TdEPcidQK	C/C++	2020-06-29 16:19:36.319+05:30	2020-06-29 16:19:36.319+05:30
zDG4S2uZL	Web	2020-06-29 16:19:36.319+05:30	2020-06-29 16:19:36.319+05:30
ejfGssvbJ	Mobile	2020-06-29 16:19:36.319+05:30	2020-06-29 16:19:36.319+05:30
mATjSBKwv	General	2020-06-29 16:19:36.319+05:30	2020-06-29 16:19:36.319+05:30
LI8bC19Zg	Data/ML	2020-06-29 16:19:36.319+05:30	2020-06-29 16:19:36.319+05:30
J25pcMNuX	Cloud	2020-06-29 16:19:36.319+05:30	2020-06-29 16:19:36.319+05:30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, "userName", "firstName", "lastName", "imageUrl", password, department, college, year, badges, karma, "viaGoogle", "registeredViaLoginViaGoogle", "registeredViaRegisterViaGoogle", "createdAt", "updatedAt") FROM stdin;
E9cFrkqrV	abcd@gmail.com	random_user	Venugopal	Venkatnappamrum	https://api.adorable.io/avatars/80/random_user.png	$2a$10$nKNK88Af3Vxhn7HWFODhV.zXSzdjfKh984LfvWvQ/HY7uEeSWsb1O	Computer	I2IT	2	\N	0	f	f	f	2020-06-29 16:19:36.347+05:30	2020-06-29 16:19:36.347+05:30
DRt1tdYKq	abcde@gmail.com	abcde	Aniket	Nigade	https://api.adorable.io/avatars/80/abcde.png	$2a$10$T4AtRy0Y69gWkg2gEDn7JeVsFN77SGQR1j4dZmAeW4TMvZY782P2K	ENTC	I2IT	3	{"Python Expert"}	2	f	f	f	2020-06-29 16:19:36.348+05:30	2020-06-29 16:19:36.348+05:30
WK1CCqJGU	raj@gmail.com	thecodersblock	Raj	Negi	https://api.adorable.io/avatars/80/thecodersblock.png	$2a$10$a/A3U93CgR0qi95VQ7lyXOutYAraxLwDlM8sZcMr4bgXn.RTWcCJi	IT	I2IT	4	{}	72	f	f	f	2020-06-29 16:19:36.348+05:30	2020-06-29 16:19:36.348+05:30
L7HNJLHpm	riya@gmail.com	riyanegi	Riya	Negi	https://api.adorable.io/avatars/80/riya.png	$2a$10$mleB309VrbniMRPIMrICoOnKMKbFkflq5f.m2Fv6iT1QP0bjj0U9m	IT	I2IT	4	{"Site Admin","JS Expert"}	51	f	f	f	2020-06-29 16:19:36.349+05:30	2020-06-29 16:19:36.349+05:30
p2hA5QtUe	thecodersblock@gmail.com	theOG	OG RAJ	YES	https://api.adorable.io/avatars/80/theog.png	$2a$10$cneWrPO3SRPJwPuf.TztB.ZKmYmwyaOYFobYJAhQe0j5RZ/exBNo2	Computer	I2IT	2	\N	324	f	f	f	2020-06-29 16:19:36.349+05:30	2020-06-29 16:19:36.349+05:30
\.


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments comments_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: comments comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: posts posts_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tags(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

