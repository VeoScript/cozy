-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "profile" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "profile" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "message" TEXT,
    "sender" TEXT,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Contacts.phone_unique" ON "Contacts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Contacts.email_unique" ON "Contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites.phone_unique" ON "Favorites"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites.email_unique" ON "Favorites"("email");

-- AddForeignKey
ALTER TABLE "Contacts" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
