# Top 100 Challenge

## View the results in localhost

Download the repository and navigate to the root folder in terminal. 
Run **npm install** to download the necessary dependencies and then run **npm start** to boot up the localhost.

## Bonus 1: Throttling the network request

To reduce the number of network request made from the mouseOver event, I used a setTimeout function to delay the network request .4 seconds before firing off. I would then clear the timeout if the function is called on a second mouseOver event. This way the network request will only get successfully fired off if the user mouses over a listing for atleast .4 seconds. 
Code Snippet for the throttling 

```javascript
  handleMouseOver(e) {
    let id = e.currentTarget.getAttribute("wineid");
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.updateNotes(id), 400);
  }

  updateNotes(id) {
    let notes;
    fetch('https://top-100-example.s3.amazonaws.com/' + id.toString() + '.json').then((response) => {
      return response.json();
    }).then((myJson) => notes = myJson).then(() =>
      this.setState({ wineNotes: notes, notesDone:true }, () => console.log("note success"))
    );
  }  
 
 ```
 ## Bonus 3
 [Live Link](https://aaxzheng.com/top100)
