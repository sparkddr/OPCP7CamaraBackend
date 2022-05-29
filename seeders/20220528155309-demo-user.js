"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "USERS",
      [
        {
          firstname: "Camille",
          lastname: "CAMARA",
          email: "cc@gmail.com",
          password:
            "$2b$10$Pq4HBqwJZuIXpRJUPm61OuPt3Ac0xMH/njykz1L8pQiK09fn/dG2W",
          role: "dev",
          admin: true,
          profilpic: "http://localhost:8000/images/init/CaptuCam.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "Cam",
          lastname: "Cool",
          email: "c@gmail.com",
          role: "dev",
          admin: false,
          profilpic:
            "http://localhost:8000/images/init/avatar-2172a57fb3e0c04fb9caccb7ee79e810.jpg",
          password:
            "$2b$10$fxHmwrDSVH1AXos9zK7jRO0VfMjvZ87vhDK1H5UPlCSS6fXxENTo2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "Joe",
          lastname: "Cool",
          email: "JC@gmail.com",
          role: "dev",
          admin: false,
          profilpic:
            "http://localhost:8000/images/init/avatar-ef101723885c846e757cc666923f5b58.jpg",
          password:
            "$2b$10$h.kVnO/8.BVAvam.H6QUUuBK.aquZkUabMcjGbWDfJQqAKhw4royi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "KARDE",
          lastname: "Coolos",
          email: "kc@gmail.com",
          role: "dev",
          admin: false,
          profilpic:
            "http://localhost:8000/images/init/avatar-3dc2006986b01f5510c1963fe879e430.jpg",
          password:
            "$2b$10$h/1nKGBAyqjLYs5MZes2QOOaiG4/VBZPevvDhkSD9WpgPT6oQOCuW",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "CALME",
          lastname: "TOI",
          email: "CT@gmail.com",
          role: "dev",
          admin: false,
          profilpic:
            "http://localhost:8000/images/init/avatar-3dc2006986b01f5510c1963fe879e430.jpg",
          password:
            "$2b$10$h/1nKGBAyqjLYs5MZes2QOOaiG4/VBZPevvDhkSD9WpgPT6oQOCuW",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("USERS", null, {});
  },
};
