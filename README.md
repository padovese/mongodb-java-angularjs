# mongodb-java-angularjs
A project using:
<br>1. MongoDB as your database, inside a docker container. 
<br>2. Java as your back-end language, with spring data. 
<br>3. Angular.js as your front-end framework.
<br>This project will be separeted in 3 parts, respectively.

I am expecting you to have:
<ul>
<li>Access to a terminal.</li>
<li>Docker installed.</li>
<li>Postman installed.</li>
<li>Some IDE from your choice.</li>
</ul>

<h1>MongoDB</h1>
MongoDB is a non-relational dabase, it is a very useful tool but you have to think first if it fits to your necessity. Our choice is made just in order to have contact with the technology. So, shall we begin?

Inside a terminal, pull the lastest image of MongoDB:
> docker pull mongo

Now that you have the image, let's make a container:
> docker run -d -p 27017-27019:27017-27019 --name mongodb -v "/home/padovese/Desktop/github/mongodbfiles:/data/db/" mongo

Ok, so much information here. Let's split it:
<br><b><i>Docker run</i></b> is the command to up a container.
<br><b><i>-d</i></b> stands for detach, it means that your container will be started in background, so you can still use your terminal or even close it.
<br><i><b>-p 27017-27019:27017-27019</i></b> stands for publish list, a list of ports that will be mapped between the conatiner and the host.
<br><i><b>--name mongodb</i></b> That's the name of your container.
<br><i><b>-v "/home/padovese/Desktop/github/mongodbfiles:/data/db/"</i></b> That's the volume list. This is very important, here you are telling to the container to bind some directory inside the container, to a directory inside the host. In practice, it works the same way as a shared folder. The separetor is the character <i><b>":"</i></b>.And obvious, change it to some directory that makes sense from your PC.
<br><i><b>mongo</i></b> the image we just pulled.

To make sure your container is running, you can run this:
> docker ps

You should see something like this:
>> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                  NAMES
<br>85042f73b5b7        mongo               "docker-entrypoint.s…"   3 weeks ago         Up 4 seconds        0.0.0.0:27017-27019->27017-27019/tcp   mongodb

Fine, it is running.
<br>Why are we nothing verifying that's there a MongoDB running inside of this?
<br>Let's dive in the container:
> docker exec -it mongodb bash

This command is basically telling the docker to execute the bash of this container, you should had notice you are not in your host anymore. Something like this appeared:
>> root@85042f73b5b7:/# 

Fine, you can do everything from here, you can explore the container using your usual commands like ls, cd, etc. etc...
<br>To see if MongoDB is installed and running(obviously it is, but whatever), run the command:
> mongo

Then:
>> MongoDB shell version v4.0.11
<br>...

You are now inside the database.

> show dbs;

Then
>> admin   0.000GB
<br>config  0.000GB
<br>local   0.000GB


You are now able to use some database, create some collections(here does not exist tables) or make some queries. But we are not doing it. Well, is better to say that we will let this task to Spring Data handle. 
<br>Just type ctrl c to escape, and after that type exit to come back to your host.

<b>Type:</b> After you restart your PC the container will not start automatically, you can control it with the commands below:
>docker start monogodb
<br>docker stop mongodb

Easiest part of the tutorial, your database is setted.

<h1>Java</h1>
Access: https://start.spring.io/
<br>We will generate the project through this online feature, provide by spring: the initializr.

project: Maven Project
<br><b>Language:</b> Java
<br><b>Spring Boot:</b> 2.1.7 (or higher)
<br><b>Project Metadata:</b> feel free to type.
<br><b>Dependencies:</b> 
<br><b>1.</b> Spring Data MongoDB - This is the responsible to allow java to connect to mongodb, as well as map the data and give us a bunch of useful features.
<br><b>2.</b> Rest Repository - This will expose our spring data repositories as REST services.
<br><b>3.</b> Lombok - This generates automatically getters, setters and constructors.
<br><b>4.</b> Spring Boot DevTools - Provide LiveReload and enhanced our life as a developer.
<br><b>5.</b> Thymeleaf - We will use it just to map our static files correctly.

Generate the project.
<br>Extract it in your worspace folder.
<br>In your IDE, import it as an existing maven project.

You will see a brand new project in your IDE, with the packages setted up, the pom setted up, and an Application class to you start your spring boot application.
<br>This is the beauty of initializr.
___

Now that the set up of our back-end application is done, let's get started.

<b>Our app will be a CRUD that manage wines.</b>
<br>In case you don't know, CRUD stands for a system that have the respective functionalities: Create, Read, Update and Delete.

The first step is to create a class that represent our product, our entity, in this case, a wine:

```java
package com.padovese.crud;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class Wine {

    @Id
    private String id;
    private String name;
    private short year;
    private WineType wineType;

}
```
You problaby are swearing me now because your class is not compiling. Let's make it all clear first.

<b>1. </b>The annotation <b><i>@Data</b></i> is from lombok.
<br>Lombok basically generates useful methods for us through the use of annotations. In this case specifically, the <b><i>@Data</b></i> generates a public constuctor with no field, a public construction with all fields, getters and setters, beside other things.
<br>To work properly, you should have the lombok in your pom.xml(we already got it because of the initializr), and you need to set up your IDE in order to it understand the use of lombok and do not face it as an error.
<br>It's very easy, please visit their site, choose install, find your IDE and follow the steps: https://projectlombok.org/

<b>2. </b> The annotation <b><i>@Document</b></i> is from spring data.
<br>Here you are telling to spring that this is a document that have to be stored in MongoDB as an document. Remember, in mongo tables does not exist, mongo has documents instead.

<b>3. </b> The annotation <b><i>@Id</b></i> is from spring data as well. It says that this field will be an unique ID on database. At mongo, ids are no a sequencial number, they are like more a hash value, this is why it is a String.

<b>4. </b> <b><i>WineType</b></i> is the reason why your class is not compiling. To solve this, we have to create the WineType, but it is not gonna be a class, it is gonna be an ENUM:
```java
package com.padovese.crud;

public enum WineType {
	RED, WHITE, ROSSE;
}
```
First step done.
___

Now we shall create an interface that is actually a repository for our wine class:  
```java
package com.padovese.crud;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface WineRepository extends MongoRepository<Wine, String>{
}
```
<i><b>MongoRepository</b></i> is an implemention that already give us useful methods for our repository, like findOne, findAll, deleteOne, etc...
<br>It uses generics, and in the diamond operator the first object is your class, and the second one is the type of your id.

That's it. You have your back-end done.
<br>Don't believe it? Open postman and make some calls:

Dependencias: 
- Rest Repository, Spring Data MongoDB //Essentials
- Optional Lombok, Spring Boot DevTools, thymeleaf

Classes to create:
Apllication -> This class is auto generated by spring initialzr. Just run it to start the application.
Wine -> This is the Pojo that represents an Entity. 
WineType -> Just an ENUM.
WineRepository -> 





-- Angular.js


Refs:
https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/

https://spring.io/guides/gs/accessing-data-mongodb/

https://spring.io/guides/tutorials/react-and-spring-data-rest/
