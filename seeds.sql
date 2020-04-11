USE passport_demo;

INSERT INTO Users (email, password, feedback_given, feedback_received, createdAt, updatedAt)
VALUES ("usertest1@gmail.com", "usertest1", 100, 50, "2020-04-11", "2020-04-11"),
("usertest2@gmail.com", "usertest2", 10, 10, "2020-04-11", "2020-04-11"),
("usertest3@gmail.com", "usertest3", 2, 1, "2020-04-11", "2020-04-11"),
("usertest4@gmail.com", "usertest4", 1, 4, "2020-04-11", "2020-04-11"),
("usertest5@gmail.com", "usertest5", 4, 3, "2020-04-11", "2020-04-11");


INSERT INTO Projects (name, url, description, last_commented, createdAt, updatedAt, userId)
VALUES ("Project Test 1", '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/754563502&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>', "Description Test 1",  "2020-04-11", "2020-04-11", "2020-04-11", 1),
("Project Test 2", '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/572735187&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>', "Description Test 2",  "2020-04-10", "2020-04-10", "2020-04-10", 2),
("Project Test 3", '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/756985960&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>', "Description Test 3",  "2020-04-09", "2020-04-09", "2020-04-09", 3),
("Project Test 4", '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/775832647&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>', "Description Test 4",  "2020-04-08", "2020-04-08", "2020-04-08", 4),
("Project Test 5", '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/768336292&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>', "Description Test 5",  "2020-04-07", "2020-04-07", "2020-04-07", 5);

INSERT INTO Feedbacks (createdAt, text, rating, updatedAt, UserId, ProjectId)
VALUES ("2020-04-11", "Feedback comment 1", 3, "2020-04-11", 1, 1),
("2020-04-10", "Feedback comment 2", 2,"2020-04-10", 2, 2),
("2020-04-09", "Feedback comment 3", 1,"2020-04-09", 3, 3),
("2020-04-08", "Feedback comment 4", 3, "2020-04-08", 4, 4),
("2020-04-07", "Feedback comment 5", 2, "2020-04-07", 5, 5);