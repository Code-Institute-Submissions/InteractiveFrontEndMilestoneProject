# Felipe Spoliante Litran Portfolio - Interactive Front End

## About

<img src="assets/images/desktop-view.gif" width="300">

This application (app) consists of a responsive dashboard  where users can find information about the wine world.  

#### Functionality
The application consists of 5 main sections providing the user with the possibility of:
1. Filtering through his or her favorite wine variety, country, price range, and/or points
2. Learning which countries are the world's largest producers
3. Discovering other user's opinions on their favorite wine variety or country
4. Finding out each country's specialties and most popular variety
5. Checking the correlation between price and points with the possibility of choosing his/her favorite wine variety or country

#### Goal

The application is designed to users who often or acasssionaly buy wine, and are curious and looking for more informartion on a specific variety or country.

#### Demo

A live demo can be found [here](https://litran1990.github.io/InteractiveFrontEndMilestoneProject/).

## UX

#### Layout
 
- Single Page Apps (SPA) are ideal for content which is mainly displayed in the form of charts. Thus, having a large dataset in hands, my initial idea was to provide a user-friendly dashboard taking into consideration the main subject of the app which is about leisure and good moments in life as oppose to a dashboard design purely to data analytics.
- As the dataset in hosted locally with no third party requests required, the application loading time is quite fast. 
- The app is well-structured and designed to avoid overwhelming the user with too much information or visual graphics.
- Responsive design has been applied to all kinds of devices including small, medium, and large phones as well as tablets, laptop, and desktop views. 

#### Important Note

- It is important to emphasize that the application heavily relies on data visualization through bar charts, pie charts and scatter plots, therefore users will have a full experience when using a laptop or desktop as oppose to a phone or tablet.

#### Colour Scheme

- Taking into account the main theme of the app, I tried to focus on the colors which could resemble to a wine bottle, a vineyard, or wine itself going from a light red of a Pinot Noir to darker shades such as Bordeaux or Cabernet Sauvignon.
- [Adobe Color](https://color.adobe.com/create/color-wheel/) provided me with complementary, compound, analogous, and monochromatic shades of red, orange, and brown used for the charts bars, pies, and legends.
- Color
    - ![#9a3339](https://placehold.it/15/9a3339/000000?text=+) `#9a3339` colour description: dark red.
    - ![#A7502F](https://placehold.it/15/A7502F/000000?text=+) `#A7502F` colour description: ldark orange. 
    - ![#F6D6C9](https://placehold.it/15/F6D6C9/000000?text=+) `#F6D6C9` colour description: light red. 
    - ![#fafafa](https://placehold.it/15/fafafa/000000?text=+) `#EBEBEB` colour description: light grey. 
    - ![#1D465D](https://placehold.it/15/1D465D/000000?text=+) `#fafafa` colour description: white. 
    - ![#1D465D](https://placehold.it/15/1D465D/000000?text=+) `#1D465D` colour description: dark blue. 
    - ![#50af57](https://placehold.it/15/50af57/000000?text=+) `#50af57` colour description: green. 
    - ![#3b8240](https://placehold.it/15/3b8240/000000?text=+) `#3b8240` colour description: dark green.

#### Font

- The font used was Lato as I decided to apply Bootwatch's theme [Superhero](https://bootswatch.com/superhero/).

## Technologies Used

#### Languages Frameworks Tools

- HTML5
- CSS3
- Bootstrap v3.3.7
- JavaScript
    - D3.js
    - DC.js
    - Crossfilter.js
    - Queue.js
- jQuery 3.3.1
- Font Awesome - v4.7.0

#### Other Resources

- [Bootwatch](https://bootswatch.com/)
- [Adobe Color](https://color.adobe.com/create/color-wheel/)
- [Sass](https://sass-lang.com/documentation/file.SASS_REFERENCE.html)

## Features

#### Existing Features

As the applications consists of a dashboard, a single-page designed was applied in order to keep a simple, clear, and well oriented logic of the charts:

- Filter: In the filter section, users can select and filter the data by country, wine variety, price and points. Once an option is selected, all charts will respond to the criteria applied by the user. In case he/she is not satisfied with the filtering chosen, a button "Reset All" is available for resetting the selected criteria back to none. 
- Country Count: Here the user can see how many constituents of each country correspond to the selected filter or to the overall data is no filter is applied.
- Average Points: In this section, users can see what is the average points/grade of each country. The bar chart as well as the pie chart will respond to any filter applied.
- National Variety: This bar chart reflects the wine variety of each country, showing their specialties and most popular wine. 
- Price to Points: Users are able to analyze the correlation between quality and price as the chart shows the price and points received by each title in the dataset. The scatterplot is also interactive and will respond to the filters in the header section of the page.
- Suggestions: This sections provides to user the opportunity to buy one of the titles suggested by the developer. The Suggestions section will take the user to [Vivino's](https://www.vivino.com/) website, where the title suggested among many others can be found for sale.
- Developer Profile: In case users are curious about the author and developer of the app, in the header section there are external link which lead to the developer's Github and LinkedIn profiles as well as his email contact information.

#### Features Left to Implement

- I wish to increase the dataset used for this project by having access to a third party large dataset or API. In this way, points, price, and titles can be constantly updated and introduced enriching the data displayed.
- An API would also be highly valuable for the "Suggestions" section. Moreover, it would enable users to have the suggestions displayed based on the criteria selected by them in the header section of the page. Thus, instead of broad and static suggestions, users would be able to receive suggestions based on their personal taste.

## Testing

Resources & Tools Used for Testing

#### HTML
-[W3 HTML Validator](https://validator.w3.org/)

#### CSS
-[W3 CSS Validator](https://jigsaw.w3.org/css-validator/)

#### JavaScript
-[JS Hint](https://jshint.com/)

#### Devices Tested

- Phones

  - Galaxy S5
  - Galaxy S9/S9+
  - iPhone 5/SE
  - iPhone 6/7/8 
  - iPhone 6/7/8 Plus
  - iPhone X
  - Nexus 5X
  - Nexus 6P
  - Pixel 2
  - Pixel 2 XL

- Tablets
  - iPad Mini
  - iPad Pro (10.5-inch)
  - iPad Pro (12.9-inch)
  - Nexus 10
  - Nexus 7

- Laptops

  - MacBook Air 
  - Dell Inspiron 15 5000

- Televisions
  - 1080p Full HD TV

#### Testing Criteria

- In this session, testing user interface was done by running multiple combinations using all four filtering types aiming to have the expected outcome. One example of criteria set is shown below:
    1. Country: France
    2. Variety: Bordeaux Style Red Blend
    3. Points: Excellent Above 95
    4. Price: Above $100

#### Testing Outcome

- The results came out as expected showing all titles corresponding to the criteria selected. 
- All external links in the header section worked properly.
- All external links in the footer section worked as expected.
- In the suggestion section, all wine cards successfully redirected the user to a new tab and third-party website where the titles can be purchased.

#### Issues During Testing Sessions

- The data had to refined multiple times due to a recurring error: Error: Invalid value for attribute transform="translate(NaN,NaN)"
- The error was due to blank values and special characters present in the dataset

## Deployment

This website has been hosted on GitHub pages, and it is deployed directly from the master branch. Therefore, once a new commit has been done the changes will automatically take effect on the master branch. 

Additionally, if you wish to run the code locally, you can clone this repository directly into the editor of your choice by pasting `git clone https://github.com/Litran1990/InteractiveFrontEndMilestoneProject` into your terminal. In order to cut ties with this GitHub repository, type `git remote rm origin` into the terminal.


## Credits

#### Dataset
- The data used for this project was obtained from [Kaggle](https://www.kaggle.com/zynicide/wine-reviews)

#### Media
- The photos used in this project were obtained from Google Images.

#### Acknowledgements

- I received inspiration for this project from Code Institute's Interactive Front End - Mini Project.
    