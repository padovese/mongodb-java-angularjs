# mongodb-java-angularjs
A project using MongoDB as your database, Java as your back-end language, and angular.js as your front-end framework.

-- Mongo

create container with mongo

docker pull mongo

docker run -d -p 27017-27019:27017-27019 --name mongodb -v "/home/padovese/Desktop/github/mongodbfiles:/data/db/" mongo

//Stop and start container after that
docker stop mongodb
docker start monogodb

Enter inside docker: docker exec -it mongodb bash
mongo
show dbs;
use test
db.customers.find({"lastName" : "Padovese"})


-- Java
Dependencias: 
- Rest Repository, Spring Data MongoDB //Essentials
- Optional Lombok, Spring Boot DevTools, thymeleaf






-- Angular.js


Refs:
https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/

https://spring.io/guides/gs/accessing-data-mongodb/

https://spring.io/guides/tutorials/react-and-spring-data-rest/
