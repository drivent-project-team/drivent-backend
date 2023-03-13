import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  console.log({ event });

  await prisma.ticketType.createMany({
    data: [
      {
        name: 'presencial',
        price: 250,
        isRemote: false,
        includesHotel: false,
      },
      {
        name: 'presencial',
        price: 600,
        isRemote: false,
        includesHotel: true,
      },
      {
        name: 'online',
        price: 100,
        isRemote: true,
        includesHotel: false,
      },
    ],
  });

  const hotel1 = await prisma.hotel.create({
    data: {
      name: "Pousada Samba Pa Ti",
      image: "https://lh3.googleusercontent.com/p/AF1QipPRvIxooymtOpFwVYbRCZIOPm-yeM34Apqwxh4=w296-h202-n-k-rw-no-v1"
    }
  });
  
  const hotel2 = await prisma.hotel.create({
    data: {
      name: "SERHS Grand Hotel & Resort",
      image: "https://lh3.googleusercontent.com/p/AF1QipP871XPsVNJR4QFZ1o6MYZUKZkUq90r2-AEqGzs=w296-h202-n-k-rw-no-v1"
    }
  });
  
  const hotel3 = await prisma.hotel.create({
    data: {
      name: "Hotel Village",
      image: "https://lh3.googleusercontent.com/p/AF1QipOtlrXjRSXfVGFnLSg3BWsIGM5wbPcmicvQQl2V=w296-h202-n-k-rw-no-v1"
    }
  });
  
  const hotel4 = await prisma.hotel.create({
    data: {
      name: "SH Blue Suítes",
      image: "https://lh5.googleusercontent.com/p/AF1QipN_ppBDK1HWAZ7bFwpLNSfWHsWBlUtO2VZtZO-m=w253-h168-k-no"
    }
  });
  

  await prisma.room.createMany({
    data: [
      {
        name: "101",
        capacity: 2,
        hotelId: hotel1.id,
      },
      {
        name: "102",
        capacity: 1,
        hotelId: hotel1.id,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: hotel1.id,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: hotel1.id,
      },
      {
        name: "105",
        capacity: 3,
        hotelId: hotel1.id,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: hotel1.id,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: hotel1.id,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: hotel1.id,
      },
      {
        name: "101",
        capacity: 2,
        hotelId: hotel2.id,
      },
      {
        name: "102",
        capacity: 1,
        hotelId: hotel2.id,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: hotel2.id,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: hotel2.id,
      },
      {
        name: "105",
        capacity: 3,
        hotelId: hotel2.id,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: hotel2.id,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: hotel2.id,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: hotel2.id,
      },
      {
        name: "101",
        capacity: 2,
        hotelId: hotel3.id,
      },
      {
        name: "102",
        capacity: 1,
        hotelId: hotel3.id,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: hotel3.id,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: hotel3.id,
      },
      {
        name: "105",
        capacity: 3,
        hotelId: hotel3.id,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: hotel3.id,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: hotel3.id,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: hotel3.id,
      },
      {
        name: "101",
        capacity: 2,
        hotelId: hotel4.id,
      },
      {
        name: "102",
        capacity: 1,
        hotelId: hotel4.id,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: hotel4.id,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: hotel4.id,
      },
      {
        name: "105",
        capacity: 3,
        hotelId: hotel4.id,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: hotel4.id,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: hotel4.id,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: hotel4.id,
      },
    ]
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
