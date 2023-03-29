# Dstny Workadventure map

## To edit map,

1. Checkout this project 
2. Create a classic token with your name for the project (github user: DstnyWorkAdventure pwd: ask ad(e)min)

![](https://i.imgur.com/eyeXeib.png)


4. Download&install tiled on https://www.mapeditor.org/
5. Start tiled (on my laptop it is not stable if not run as root)
6. edit office3.json with tiled

There are several layers


![](https://i.imgur.com/yLh0401.png)


For example go to bar2
![](https://i.imgur.com/YncnHgQ.png)

Select the umbrella bag and put it where you want
![](https://i.imgur.com/iGre9od.png)



Use the furniture layer to add to the furniture what you want.

Then Save


Some tiles are included in the project. If you want to add new tileset, you will need to embed them. a tile which is not embedded will break the map

Then,
```
git add office3.json
git commit "my new commit"
git push
    * user: DstntWorkAdventure
    * password: your classic token
```

The pipeline will build it and make it available (browser need to clear cache and reload page)

This can take a very long time (several minutes) and sometime github fails
To check you can go to the github page and click on "action"

## Adding objects

If you want to add on object to your desk (more precisely positioned than tiles)

Open the objects layer

Find a tile that you want to position
Click on Insert Tile (T) on the icon bar
Position on the image
![](https://i.imgur.com/nuUu8EB.png)
Remove all other layers except the officethings layer
![](https://i.imgur.com/QcuOxJN.png)

File>export as image on object1.png
![](https://i.imgur.com/bZ1KySV.png)

This will create a tile which contain your new object

Do not save and restart tiled

add object1.png and commit



