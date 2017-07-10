Go to https://phonglk.github.io/optimise-nct-util/ 

Drag and drop "Optimise NCT" to your bookmark bar

After NCT User Player is loaded, just click the bookmark bar to optimise its player.

* User Player is your own playlist at /user/ ...

# What is NCT ?

Nhac Cua Tui is a popular free music service in Vietnam, its competitor such as Mp3 Zing, nhacso (died ?), ...

# What is the problem ?

NCT's app and web are shitty. Despite that their mobile apps are upraded, their Web App is still bad, the performance is worse than its competitor: Mp3 Zing. Playing music in background is CPU Consuming. 

Especially, If you are using a laptop, it will drain your battery like hell ... 
Because I had paid for the VIP member so I don't want to switch to Mp3 Zing (I will do after VIP Subscription is expired)

So I tried to optimise its player for my good.

* I am using Google Chrome, Other browser may do not have my problems

# Why it is CPU consuming ?

- Updating progress bar and play time is frequently
- Loading animation is still runing in background
- Some unecessary triggering (I think so)
- Gif is bad for Chrome

# What the script do ?

- Replace original progress handlers whit less frequent, optimised handler
- Add display:none to loader animation so browser don't have to render it
- Remove unused triggers
- Replace gif by music note unicode character

# What is the difference ?

On my machine, the CPU Usage is reduced by 4 times ! From ~10.0 to ~2.5. 
The test is taken with sandboxed environment where there is almost zero extensions.