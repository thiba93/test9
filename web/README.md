# Context

The realization of this project relied on Next.js for the back, ReactJS for the front and PostgreSQL for the database :

By choosing ReactJS for the development of our web project, we have opted for a modern, high-performance and reliable technology that enables us to create a responsive, maintainable and scalable e-commerce platform. The advantages offered by ReactJS, such as optimized performance, modular components and a rich ecosystem, ensure that we can offer a superior user experience experience, while facilitating the maintenance and future evolution of our application.  

In choosing Next.js for the development of our web application, we have modern, high-performance solution that combines the advantages of server-side rendering server-side rendering and static site generation. The advantages offered by Next.js, such as improved performance and SEO, enhanced development experience integrated routing, advanced functionality and a rich ecosystem, ensure that we can build a robust, scalable and easy-to-maintain and easy to maintain. This approach enables us to respond effectively to the project requirements, delivering a superior user experience and facilitating and facilitating the management and future evolution of our application.  

By choosing PostgreSQL to manage our database, we've opted for a reliable, high-performance and feature-rich solution. reliable, high-performance and feature-rich solution. The advantages benefits of PostgreSQL, such as ACID compliance, advanced features scalability, robust security, open source status, and active community source status, and active community support, ensure that we can manage our e-commerce platform. This approach effectively meet our project requirements, delivering a superior user experience and user experience, and facilitating the management and future evolution of our of our application.  

# How to start the project ?

- First clone the project : git clone https://github.com/ErdalKARAER/airneis.git
- Then, install the dependecies : npm install
- After this, launch the project : npm run start (for production mode) / npm run dev (for dev mode)

# How to connect the database ?

We use Prisma to handle database relationship.

In choosing Prisma to interact with our database, we opted for a modern, high-performance and easy-to-use solution. modern, high-performance and easy-to-use solution. The advantages offered by intuitive API, enhanced security, automated migrations, optimized queries optimized queries, multi-database support, and comprehensive ensure that we can manage the database operations of our e-commerce operations of our e-commerce platform. This approach enables us to respond project requirements, delivering a superior user experience and facilitating and facilitating the management and future evolution of our application.  

- First, change the connection to the database by updating the .env file.
- Then, generate prisma client by typing : npx prisma generate
- Now, run the migration by typing : npx prisma migrate dev --name init
- Once it's done you can hydrate your database with fake data by typing thank's to FakerJS : npm run seed

