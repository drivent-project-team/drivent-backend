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
      name: "Pousada Samba",
      image: "https://viajandocomamalarosa.com.br/wp-content/uploads/2020/05/Ocean-Palace.jpg"
    }
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      name: "Mar Hotel",
      image: "https://www.carpemundi.com.br/wp-content/uploads/2020/07/melhores-resorts-brasil.jpg"
    }
  });

  const hotel3 = await prisma.hotel.create({
    data: {
      name: "Hotel Village",
      image: "https://media.staticontent.com/media/pictures/787e6fc3-e840-452f-a2a7-39fa47ee5d9a"
    }
  });

  const hotel4 = await prisma.hotel.create({
    data: {
      name: "SH Blue Suítes",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Town_and_Country_fh000023.jpg"
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


  const place1 = await prisma.place.create({
    data: {
      name: 'Auditório Principal'
    }
  })

  const place2 = await prisma.place.create({
    data: {
      name: 'Auditório Lateral'
    }
  })

  const place3 = await prisma.place.create({
    data: {
      name: 'Sala de Workshops'
    }
  })

  await prisma.activity.createMany({
    data: [
      {
        placeId: place1.id,
        date: dayjs().toDate(),
        name: 'Minicurso React',
        capacity: 27,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place1.id,
        date: dayjs().toDate(),
        name: 'Minicurso Prisma',
        capacity: 12,
        startAt: '10:00',
        endsAt: '11:00'
      },
      {
        placeId: place2.id,
        date: dayjs().toDate(),
        name: 'Minicurso Node',
        capacity: 10,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place2.id,
        date: dayjs().toDate(),
        name: 'Minicurso Typescript',
        capacity: 0,
        startAt: '10:00',
        endsAt: '11:00'
      },
      {
        placeId: place3.id,
        date: dayjs().toDate(),
        name: 'Minicurso HTML Semântico',
        capacity: 17,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place3.id,
        date: dayjs().toDate(),
        name: 'Minicurso CSS',
        capacity: 27,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place1.id,
        date: dayjs().add(1, 'day').toDate(),
        name: 'Minicurso Express',
        capacity: 10,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place1.id,
        date: dayjs().add(1, 'day').toDate(),
        name: 'Minicurso Joy',
        capacity: 0,
        startAt: '10:00',
        endsAt: '11:00'
      },
      {
        placeId: place2.id,
        date: dayjs().add(1, 'day').toDate(),
        name: 'Minicurso Mongodb',
        capacity: 11,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place2.id,
        date: dayjs().add(1, 'day').toDate(),
        name: 'Minicurso SQL',
        capacity: 3,
        startAt: '10:00',
        endsAt: '11:00'
      },
      {
        placeId: place3.id,
        date: dayjs().add(1, 'day').toDate(),
        name: 'Minicurso Postgres',
        capacity: 27,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place3.id,
        date: dayjs().add(1, 'day').toDate(),
        name: 'Minicurso JavaScript',
        capacity: 8,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place1.id,
        date: dayjs().add(2, 'day').toDate(),
        name: 'Minicurso ES6',
        capacity: 6,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place1.id,
        date: dayjs().add(2, 'day').toDate(),
        name: 'Minicurso Testes Unitários',
        capacity: 15,
        startAt: '10:00',
        endsAt: '11:00'
      },
      {
        placeId: place2.id,
        date: dayjs().add(2, 'day').toDate(),
        name: 'Minicurso Scrum',
        capacity: 0,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place2.id,
        date: dayjs().add(2, 'day').toDate(),
        name: 'Minicurso Testes de Integração',
        capacity: 10,
        startAt: '10:00',
        endsAt: '11:00'
      },
      {
        placeId: place3.id,
        date: dayjs().add(2, 'day').toDate(),
        name: 'Minicurso Git',
        capacity: 12,
        startAt: '09:00',
        endsAt: '10:00'
      },
      {
        placeId: place3.id,
        date: dayjs().add(2, 'day').toDate(),
        name: 'Hackathon',
        capacity: 27,
        startAt: '09:00',
        endsAt: '10:00'
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
