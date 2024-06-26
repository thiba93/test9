# Context

The realization of this project relied on Nodejs, Next.js, PostgreSQL, Prisma and Axios for the back :

In choosing Prisma to interact with our database, we opted for a modern, high-performance and easy-to-use solution. modern, high-performance and easy-to-use solution. The advantages offered by intuitive API, enhanced security, automated migrations, optimized queries optimized queries, multi-database support, and comprehensive ensure that we can manage the database operations of our e-commerce operations of our e-commerce platform. This approach enables us to respond project requirements, delivering a superior user experience and facilitating and facilitating the management and future evolution of our application.  

In choosing Next.js for the development of our web application, we have modern, high-performance solution that combines the advantages of server-side rendering server-side rendering and static site generation. The advantages offered by Next.js, such as improved performance and SEO, enhanced development experience integrated routing, advanced functionality and a rich ecosystem, ensure that we can build a robust, scalable and easy-to-maintain and easy to maintain. This approach enables us to respond effectively to the project requirements, delivering a superior user experience and facilitating and facilitating the management and future evolution of our application.  

By choosing PostgreSQL to manage our database, we've opted for a reliable, high-performance and feature-rich solution. reliable, high-performance and feature-rich solution. The advantages benefits of PostgreSQL, such as ACID compliance, advanced features scalability, robust security, open source status, and active community source status, and active community support, ensure that we can manage our e-commerce platform. This approach effectively meet our project requirements, delivering a superior user experience and user experience, and facilitating the management and future evolution of our of our application.  

By choosing Node.js for the backend development of our web project, we have we opted for a high-performance, scalable solution adapted to the modern needs needs of modern e-commerce applications. The advantages offered by Node.js include its non-blocking model, unified JavaScript environment, rapid development development speed, efficient real-time data management and broad community support community support, ensure that we can build a robust and responsive responsive platform. This approach enables us to respond effectively to the requirements of our requirements of our e-commerce platform, delivering a superior user experience experience, while facilitating the maintenance and future evolution of our application.  

In choosing Axios for the HTTP requests of our web project, we opted for a solution that was flexible, powerful and easy to use. a flexible, powerful and easy-to-use solution. The advantages offered by Axios, such as ease of use, compatibility with modern environments environments, advanced functionality, simplified data management, security and support for pagination and multiple queries, ensure that we'll be able to build a high-performance, secure web application. This approach enable us to respond effectively to the requirements of our e-commerce platform, by enhancing the user experience and facilitating the management of communications with backend APIs.  

We use Prisma to handle database relationship.  

In choosing Prisma to interact with our database, we opted for a modern, high-performance and easy-to-use solution. modern, high-performance and easy-to-use solution. The advantages offered by intuitive API, enhanced security, automated migrations, optimized queries optimized queries, multi-database support, and comprehensive ensure that we can manage the database operations of our e-commerce operations of our e-commerce platform. This approach enables us to respond project requirements, delivering a superior user experience and facilitating and facilitating the management and future evolution of our application.  

- First, change the connection to the database by updating the .env file.
- Then, generate prisma client by typing : npx prisma generate
- Now, run the migration by typing : npx prisma migrate dev --name init
- Once it's done you can hydrate your database with fake data by typing thank's to FakerJS : npm run seed

