README
# Description
Play hangman online! Create new words and log a database filled with your
favorite words! With so many words to choose from, the games are endless!

# Technology used
Used RoR to create a one-to-many database style using words and users to create a
database of words to choose from. Used sql for database storage and Ajax, jquery
and JavaScript to create the front end

# How it works
Using the JS to create a front end, Hangman stores data in the api in the form
of words that can be used to play hangman games. Using user data to make and
update the words, the game relies on randomly obtaining a word from the bank,
and proceeding to compare the guesses of the user with the letters that appear
in the word. Upon defeat, the word is displayed, and reloaded with game start

# Unsolved issue
Wanted to create more search functions and create a better ui
Wanted to include user picking a words
Wanted to include the stickman instead of (0/6) to denote stories

# Planning
Wanted to create a game to go with a data base. Decided on hangman. First completed
user auth, then created CRUD actions in the way of forms. Upon completion, made
game logic then decided to move the forms to handlbars to control each word. 

# Wireframe, ERD, and user stories
https://git.generalassemb.ly/ga-wdi-boston/full-stack-project/issues/3103

# Links
Back end (api)
https://github.com/breakfastorder/project-two
Deployed back end
https://infinite-garden-55761.herokuapp.com/words


Front end
https://github.com/breakfastorder/projectTwoFront
Deployed front end
https://breakfastorder.github.io/projectTwoFront/
