/*
  Warnings:

  - You are about to drop the `eventDates` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `date` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_date_fkey";

-- DropForeignKey
ALTER TABLE "eventDates" DROP CONSTRAINT "eventDates_eventId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "eventDates";
