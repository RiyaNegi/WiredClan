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
    "tagId" character varying(255),
    "deletedAt" timestamp with time zone
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
-- Name: teammates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teammates (
    id character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" character varying(255),
    "postId" character varying(255)
);


ALTER TABLE public.teammates OWNER TO postgres;

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
20200630181839-createTeammate.js
20200703185417-add-deleted-at.js
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, text, "createdAt", "updatedAt", "parentId", "postId", "userId") FROM stdin;
bu6m5EHy1	Nice	2020-07-04 01:42:33.097+05:30	2020-07-04 01:59:33.097+05:30	\N	RYEMVmbJx	m3TGjkjwc
ApTUzKxsR	This is my first post	2020-07-03 01:59:33.097+05:30	2020-07-04 01:59:33.097+05:30	\N	BIhNsbI1V	m3TGjkjwc
nxExnVHQG	Very cool	2020-07-03 01:59:33.097+05:30	2020-07-04 01:59:33.097+05:30	\N	BIhNsbI1V	NYZBMVHGV
VRUr27imW	Very cool	2020-07-03 01:59:33.097+05:30	2020-07-04 01:59:33.097+05:30	\N	xF1cZWHpj	NYZBMVHGV
ZTfM4GE9J	Thank you!	2020-07-04 01:42:33.097+05:30	2020-07-04 01:59:33.097+05:30	bu6m5EHy1	RYEMVmbJx	NYZBMVHGV
DTwyzrvPn	This is great. How did you do it?	2020-07-04 01:42:33.097+05:30	2020-07-04 01:59:33.097+05:30	ApTUzKxsR	BIhNsbI1V	EB5xxfzNF
pRXceRpvF	By myself. And a lot of Horlicks. I am sponsored by them to be honest.	2020-07-04 01:42:33.097+05:30	2020-07-04 01:59:33.097+05:30	ApTUzKxsR	BIhNsbI1V	m3TGjkjwc
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (id, "createdAt", "updatedAt", "userId", "postId") FROM stdin;
5ffBRyHsH	2020-07-04 01:59:33.092+05:30	2020-07-04 01:59:33.092+05:30	EB5xxfzNF	GzaWD7pdh
f8VeuqrIR	2020-07-04 01:59:33.092+05:30	2020-07-04 01:59:33.092+05:30	m3TGjkjwc	GzaWD7pdh
G9kYFtsMV	2020-07-04 01:59:33.092+05:30	2020-07-04 01:59:33.092+05:30	EB5xxfzNF	BIhNsbI1V
yKxhIwRdE	2020-07-04 01:59:33.092+05:30	2020-07-04 01:59:33.092+05:30	m3TGjkjwc	xF1cZWHpj
QsGmV54CR	2020-07-04 01:59:33.092+05:30	2020-07-04 01:59:33.092+05:30	EB5xxfzNF	jZP86yhpY
3YSpbXfvQ	2020-07-04 01:59:33.092+05:30	2020-07-04 01:59:33.092+05:30	m3TGjkjwc	iTqvgXBvY
aA8ztQ2Ic	2020-07-04 01:59:33.092+05:30	2020-07-04 01:59:33.092+05:30	EB5xxfzNF	VPdjkcN1d
Anj5sjFpG	2020-07-04 01:59:33.092+05:30	2020-07-04 01:59:33.092+05:30	tBivRDqvZ	BIhNsbI1V
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, blah, title, description, published, karma, "createdAt", "updatedAt", "userId", "tagId", "deletedAt") FROM stdin;
RYEMVmbJx	\N	I've Been Making a Video Series about Building a 16-bit Virtual Machine.	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	18	2020-07-03 18:59:33.077+05:30	2020-07-04 01:59:33.078+05:30	NYZBMVHGV	b6tM3mBtu	\N
BIhNsbI1V	\N	Generators in Rust, C++20, Go, and More	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	4	2020-07-03 15:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	m3TGjkjwc	b6tM3mBtu	\N
xF1cZWHpj	\N	The Colorful Game of Life - a variant of Conway's Game of Life	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	f	11	2020-06-27 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	EB5xxfzNF	GtyhTgwJq	\N
jZP86yhpY	\N	Some random post	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	11	2020-06-27 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	tBivRDqvZ	GtyhTgwJq	\N
iTqvgXBvY	\N	Feel-O-Meter (visualize the dominant emotions in your Spotify playlists based on lyrics)	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	10	2020-06-17 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	EB5xxfzNF	fNXw9iDwT	\N
VPdjkcN1d	\N	What a typical 100% Serverless Architecture looks like in AWS!	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	3	2020-06-17 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	m3TGjkjwc	BV1bUwube	\N
GzaWD7pdh	\N	One	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	0	2020-06-07 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	m3TGjkjwc	fNXw9iDwT	\N
pbI4WNsf3	\N	I built an open-source personal assistant powered by an artificial neural network in Go	<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n	t	1	2020-07-04 01:57:33.078+05:30	2020-07-04 01:59:33.078+05:30	L6bHNwQhh	fNXw9iDwT	\N
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, text, "createdAt", "updatedAt") FROM stdin;
ZjIIhFY14	Python	2020-07-04 01:59:32.054+05:30	2020-07-04 01:59:32.054+05:30
BV1bUwube	C/C++	2020-07-04 01:59:32.054+05:30	2020-07-04 01:59:32.054+05:30
fNXw9iDwT	Web	2020-07-04 01:59:32.054+05:30	2020-07-04 01:59:32.054+05:30
b6tM3mBtu	Mobile	2020-07-04 01:59:32.054+05:30	2020-07-04 01:59:32.054+05:30
GtyhTgwJq	General	2020-07-04 01:59:32.054+05:30	2020-07-04 01:59:32.054+05:30
QAYxbxt63	Data/ML	2020-07-04 01:59:32.054+05:30	2020-07-04 01:59:32.054+05:30
2F42EqymE	Cloud	2020-07-04 01:59:32.054+05:30	2020-07-04 01:59:32.054+05:30
\.


--
-- Data for Name: teammates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teammates (id, "createdAt", "updatedAt", "userId", "postId") FROM stdin;
3m4qqfjrc	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	NYZBMVHGV	RYEMVmbJx
iyzb1BGCI	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	EB5xxfzNF	RYEMVmbJx
fPigKLtBc	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	m3TGjkjwc	BIhNsbI1V
xXnc31KFD	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	EB5xxfzNF	xF1cZWHpj
G8X9g9YAt	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	tBivRDqvZ	jZP86yhpY
JFNjJKyqL	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	m3TGjkjwc	jZP86yhpY
dNCifIyaX	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	EB5xxfzNF	iTqvgXBvY
a3K34PcJ8	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	m3TGjkjwc	VPdjkcN1d
cgkYAxnCA	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	m3TGjkjwc	GzaWD7pdh
pnhBjQTvr	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	L6bHNwQhh	pbI4WNsf3
NTZIA1nR6	2020-07-04 01:59:33.078+05:30	2020-07-04 01:59:33.078+05:30	EB5xxfzNF	pbI4WNsf3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, "userName", "firstName", "lastName", "imageUrl", password, department, college, year, badges, karma, "viaGoogle", "registeredViaLoginViaGoogle", "registeredViaRegisterViaGoogle", "createdAt", "updatedAt") FROM stdin;
NYZBMVHGV	abcd@gmail.com	random_user	Venugopal	Venkatnappamrum	https://api.adorable.io/avatars/80/random_user.png	$2a$10$CqZfAWrN10cQ6eIUtkJUKedZ7k6iuprOdXVG1r0pHABAympPJlX0m	Computer	I2IT	2	\N	0	f	f	f	2020-07-04 01:59:32.08+05:30	2020-07-04 01:59:32.08+05:30
m3TGjkjwc	abcde@gmail.com	abcde	Aniket	Nigade	https://api.adorable.io/avatars/80/abcde.png	$2a$10$NsRnS9H37DfKQsvMCJa/hOtF1qNlGPF/8yXo.H.nJDdIdi38KEgiS	ENTC	I2IT	3	{"Python Expert"}	2	f	f	f	2020-07-04 01:59:32.081+05:30	2020-07-04 01:59:32.081+05:30
EB5xxfzNF	raj@gmail.com	thecodersblock	Raj	Negi	https://api.adorable.io/avatars/80/thecodersblock.png	$2a$10$5XNnLFAlyFSgKVzsn8gqkui6uOalttsqjp/eprmMrrp/CGOGCmkBO	IT	I2IT	4	{}	72	f	f	f	2020-07-04 01:59:32.081+05:30	2020-07-04 01:59:32.081+05:30
tBivRDqvZ	riya@gmail.com	riyanegi	Riya	Negi	https://api.adorable.io/avatars/80/riya.png	$2a$10$1IG7lncjf2Q4b2Pri7QjTOeEGkt1klLMFyJ5tzMIIYyRsICiQleh2	IT	I2IT	4	{"Site Admin","JS Expert"}	51	f	f	f	2020-07-04 01:59:32.081+05:30	2020-07-04 01:59:32.081+05:30
L6bHNwQhh	thecodersblock@gmail.com	theOG	OG RAJ	YES	https://api.adorable.io/avatars/80/theog.png	$2a$10$XUkNckdd1Dc0468TTzKg2.x1jZzIhrGvEORkXNOXncUVJrok/cnJa	Computer	I2IT	2	\N	324	f	f	f	2020-07-04 01:59:32.082+05:30	2020-07-04 01:59:32.082+05:30
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
-- Name: teammates teammates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teammates
    ADD CONSTRAINT teammates_pkey PRIMARY KEY (id);


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
-- Name: teammates teammates_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teammates
    ADD CONSTRAINT "teammates_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: teammates teammates_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teammates
    ADD CONSTRAINT "teammates_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

