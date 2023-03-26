## Inspiration
If you’re reading this, then like us, you’re probably passionate about attending and/or organizing hackathons. You’ve also probably found yourself looking up information regarding a hackathon either in preparation for or in review of the event. 

Personally, we found that the process of finding the aforementioned info can be dull, tedious, and very repetitive, so we decided to do something about it! We created a faster, engaging, and more precise tool for getting info on hackathons: HackWrapr!

We know that every team will say that their project is ground-breaking and maybe they all are, but we urge you to just give ours a try. If you do, we believe that you will truly wonder why you ever searched up hackathons any other way.

## What it does
All you have to do is paste the devpost link for the hackathon of interest, and at the push of a button, HackWrapr will scrape the internet for information on the event and provide it to you in a gamified manner. You are given a chance to guess the values of the info, and afterwards its true value will be revealed alongside whether you guessed correctly.

## How we built it
Brainstorming: 
1. We discussed what we’d like to implement, keeping in mind the time limitation.
2. We sketched up a draft for what the website could look like using figma. 
3. We distributed the programming amongst the three of us appropriately.
Technical:
1. Using React.js, Next.js, and Tailwind, we created the GUI/frontend of our website
2. Our backend, created with JavaScript, takes in the devpost link submitted by our user, and uses algorithms we wrote ourselves, parses through all of the information in all the devpost submissions at the hackathon
3. Petty note: there is no devpost api, we had to scrape all the information ourselves. It sucked, but we got through it and wanted to mention that
4. After parsing all the info from the devpost submissions, we utilized the github api to parse through all the information from the github repositories submitted to the hackathon, still using just JavaScript
5. At the end of this, we went through all the info that we have, took out specific pieces we deemed important, and presented it to our user in a gamified manner

## Challenges we ran into
1. The hell that is merging git branches was difficult to navigate. But sitting down with one another, and drawing out our processes, we were able to get it running.
2. As two of the three of us had never used React.js and Tailwind on the level that we did today, it was a bit hard to navigate at the beginning, but we were able to catch up!
3. Creating an interactive slider for the game portion of our website on React

## Accomplishments that we're proud of
1. The slider we put on for the game portion of our website was really difficult to implement. We were able to get the slider on our page with relative ease, however, customizing it was a totally different story. Although it doesn’t seem like much, our little slider makes us very proud. 
2. We scraped through enormous amounts of data!
3. As we’re beginner hackers we were really nervous coming in, but in the end we were able to make a really well designed and implemented website!
## What we learned
How to utilize: React.js, Next.js, and JavaScript
How to utilize: Tailwind and CSS
How to utilize: Figma
How to utilizeProcreate

## What's next for HackWrapr
We would love to implement more games/levels in the gaming portion 
We would love to allow users to specify what info they want returned
We would like animate items on our website
We would love to use more interesting fonts
