-- CreateTable
CREATE TABLE "artists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albums" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "release_date" TIMESTAMP(3),

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "album_id" INTEGER NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lyrics" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "song_id" INTEGER NOT NULL,

    CONSTRAINT "lyrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlbumToArtist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "artists_name_key" ON "artists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "albums_title_key" ON "albums"("title");

-- CreateIndex
CREATE UNIQUE INDEX "lyrics_song_id_key" ON "lyrics"("song_id");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToArtist_AB_unique" ON "_AlbumToArtist"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToArtist_B_index" ON "_AlbumToArtist"("B");

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lyrics" ADD CONSTRAINT "lyrics_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToArtist" ADD FOREIGN KEY ("A") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToArtist" ADD FOREIGN KEY ("B") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
