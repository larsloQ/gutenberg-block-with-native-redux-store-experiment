# Experimental native redux store working with a gutenberg block

A wordpress plugin providing a gutenberg block which uses a native redux store.

## Description
For a project I needed a block which allows a wp-editor to collect the meta-data of other posts based on certain criteria like content-type or taxonomy. 
Searching for info about how to do it, I found myself pretty confused. Mostly because the incomplete and awkward documentation of gutenberg block-editor and its surrounding technologies. 
When reading through the docs of *@wordpress/data*  (https://developer.wordpress.org/block-editor/packages/packages-data/) and tried to wire up a simple redux store for my block, I got even more confused, since it introduces completely new methodology related to redux stores
namely *selectors*, *resolvers* and *controls*. 
On the other hand there is the world-class documentation of redux and its widely used and acknowledged way to handle state in react apps. 
So I decided to take the classic native redux way instead of the gutenberg way. 


## Contents:
This repo contains a wordpress plugin which comes with a block that uses a redux store. 
It does the following: 

1) the PHP files enqueue the block-editor code (from folder *assets*) and register a WP-REST-API-ROUTE (*{YOUR_WORDPRESS_URL}/wp-json/native/redux/demo/route*)
2) a block which sets two buttons in the inspector-sidebar for triggering redux actions (one async action using *wp.apiFetch*, *redux-thunk* to fetch data, and a plain action to reset it.)

## Background
When developing a block for wordpress there is no way to register a store at the root of the whole editor-app / the whole editor.
Well probably there is a way by building a *Gutenberg Plugin* (e.g. https://developer.wordpress.org/block-editor/developers/slotfills/).
Blocks by nature can occur multiple times on one page, and therefore, when each registers its one store, there is a violation of the redux rule "one store per app". Also when an other block registers an other store we have more than one. 
I tested these things, and even if different blocks register different stores and each blocks appears multiple on one page, this setup is still working, as long as we use the unique block-id as a key in state.

## See actions in Redux DevTools
If you want to see the actions and state in ReduxDevTools make sure to select:
*Edit Post* in Instances (When having "autoselect" instances, to amount of actions produced by the gutenberg editor makes it much harder to pick the action). Its interesting to see more than one *edit post* store when you register an other block with a redux store.

## Getting Started
Download / Clone and put inside your plugins / mu-plugins directory. 
You should be able to use the block when plugin is active. Block is named "REDUX STORE FOR A WP_BLOCK DEMO"

# Development
For further dev run:

```
cd /wp-content/plugins/native-redux-block/
npm install
npm start
```

For generate compressed files

```
npm run build
```



## Authors

* **larslo**  (https://larslo.de)


## License

This project is licensed under the MIT License

## Acknowledgments

* package.json / webpack setup is based on https://github.com/goiblas/Map-Block-Leaflet


