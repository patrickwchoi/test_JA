<h2>Patrick's Pokemon Game (name will be updated)</h2>

Link: https://patrickwchoi.github.io/javascript_project_AA/ 

<h3>Overview:</h3>
Instructions: As a member of Team Rocket, you find yourself lost and separated from your crew after being blasted into space yet again. When you wake up, you find a friendly Bagon by your side. You realize that if you evolve this Bagon, you can use them to fly back home! 
<hr>

GOAL: Evolve Bagon by finding ways to increase your friendship level! You can check friendship level with the pokedex on the menu.

Controls: Use WASD to move, use your mouse to interact with things on screen.

<h3>Features: </h3>

<li>Moving a background image with WASD on canvas to simulate movement. </li>
<li>Adding collision detection where relevant on my map </li>
<li>Interaction with canvas through mouse clicking </li>
<li>Interaction with buttons on dialoguebox and Menu through clicking </li>

![image](https://user-images.githubusercontent.com/98565804/206596016-589e9ef3-51b8-40ed-97a3-e1f049dfd546.png)
![image](https://user-images.githubusercontent.com/98565804/206596073-e40b6948-4c0d-40f6-b16e-0ba94516c92e.png)


<hr>

<h3>NB: </h3>
Today's version is still unfortunately largely  unfinished. I realized my project would take a lot longer to fully complete in terms of content. I was able to establish a lot of the base logic such as movement, collisions, interaction with the dialogue box/menu/canvas, as well as how to make/find my relevant assets like the map I built. But there is still a lot more content I need to push into my game, partly due to the nature of my game being an RPG driven by plot. 
<hr>

Technologies: Mostly HTML Canvas. The rest is all JS/CSS/HTML. Used Tiled to build a gridded map that I exported as a PNG, as well as an array so I could have the coordinates of all my collision blocks to add. 
<hr>

<h3>Implementation: </h3>

My first step was setting up my background. On tiled, I made a map that I exported as a png. I also exported the collisions layer as an array filled with red tiles for where I want my collisions. In my code, I use convert this array into 2d so the indices match their positions. Then, I generate an array of Boundary objects with the corresponding position for each collision tile. This boundaries array is moved along with my background x amount of pixels everytime I walk a direction. Before I move, I check the distance I'd move to see if a boundary exists. If it does, then I prevent movement(aka I don't move my background).

![image](https://user-images.githubusercontent.com/98565804/206592484-d82975c3-e202-4acf-86ac-2bd9b793dc8f.png)

![image](https://user-images.githubusercontent.com/98565804/206592407-c23d5d7f-17e5-4eae-806d-8b94fa3c0469.png)

To draw out my sprites, I used the drawImage() function for canvas and used all 8 pos args to crop out and resize my sprite. Having a screenWidth and screenHeight property helped me out a lot because they account for the zoom that I apply to the original png of my sprites.
![image](https://user-images.githubusercontent.com/98565804/206596370-03fe211b-390a-4f84-8717-9af6479b92a8.png)

A lot of my other logic came from OOP and defining objects and how to interact between them. Something dificult was having my code interact and update HTML elements because of how much code I felt like I had to write for very simple tasks. 

<hr>
<h3>To do List:</h3>
  -Fix up visuals for my evolved pokemon
  -Improve overall CSS styling of dialogue box and menu
  -Add other pokemon that I can interact with. They will help me evolve my pokemon
  -Add items I can interact with to help me evolve pokemon
  -Add inventory section in menu to items
  -Improve map
  -Restructure code to be more organized
  -Add feature to switch avatars
  -Add music and sound effects
  -Add animation for plot purposes
  -Add a start screen
  -Clean up interaction between logic and dialoguebox and menu
  -Add some sort of DSA like finding the shortest path to me

