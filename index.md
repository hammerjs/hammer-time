# Arraysweeper

A module for creating an array based minesweeper game.



* * *

### Arraysweeper.module:Arraysweeper(height, width, count) 

A module for creating an array based minesweeper game.

**Parameters**

**height**: `number`, Height of the board to create.

**width**: `number`, Width of the board to create.

**count**: `number`, The number of mines to place on the board.



### Arraysweeper.mineCount(row, col) 

Get the mine count for the current space

**Parameters**

**row**: `number`, The row number for the space.

**col**: `number`, The column number for the space.



### Arraysweeper.flag(row, col, state) 

Get or set the flag status of the space

**Parameters**

**row**: `number`, The row number for the space.

**col**: `number`, The column number for the space.

**state**: `boolean`, OPTIONAL if included set the flag state for space other wise get it.



### Arraysweeper.reveal(row, col) 

Reveal the space

**Parameters**

**row**: `number`, The row number for the space.

**col**: `number`, The column number for the space.



### Arraysweeper.render() 

Render the board - This logs a textual representation to the console



### Arraysweeper.getBoard() 

Get the board object - This should not be used by players only when implementing the api
DONT CHEAT :-)




* * *










