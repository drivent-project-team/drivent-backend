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

  await prisma.hotel.createMany({
    data: [
      {
        name: "Pousada Parati",
        image: "https://visualpraiahotel.com.br/wp-content/uploads/2021/11/hotel-beira-mar-em-natal-Visual-Praia-2.jpg"
      },
      {
        name: "SERHS Hotel",
        image: "https://lh3.googleusercontent.com/p/AF1QipP871XPsVNJR4QFZ1o6MYZUKZkUq90r2-AEqGzs=w296-h202-n-k-rw-no-v1"
      },
      {
        name: "Hotel Village",
        image: "https://www.dicasdeviagem.com/wp-content/uploads/2022/05/hotel-fasano-angra-dos-reis-e1652707437760.jpg"
      },
      {
        name: "SH Blue Suítes",
        image: "https://www.aldeiadapraia.com.br/wp-content/uploads/2020/09/psicina.jpg"
      },
    ]
  });

  await prisma.room.createMany({
    data: [
      {
        name: "101",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "102",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "105",
        capacity: 3,
        hotelId: 1,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "101",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "102",
        capacity: 1,
        hotelId: 2,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: 2,
      },
      {
        name: "105",
        capacity: 3,
        hotelId: 2,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: 2,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: 2,
      },
      {
        name: "101",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "102",
        capacity: 1,
        hotelId: 3,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: 3,
      },
      {
        name: "105",
        capacity: 3,
        hotelId: 3,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: 3,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: 3,
      },
      {
        name: "101",
        capacity: 2,
        hotelId: 4,
      },
      {
        name: "102",
        capacity: 1,
        hotelId: 4,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: 4,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: 4,
      },
      {
        name: "105",
        capacity: 3,
        hotelId: 4,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: 4,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: 4,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: 4,
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
