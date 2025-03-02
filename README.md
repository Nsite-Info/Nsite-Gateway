# Nsite-Gateway
 
⚠️ Warning This repo is still under heavy development.

## Project Settings

The Config folder contains the project.json file here you can configure the way the gateway resolves.

There are 2 main Gateway configurations: 

- Gateway to resolve all Nsite's at the sudomain level by setting the gateway to true.

- Gateway to resolve your own Nsite only, here you will have to provide your own Npub.

## Technical Scope

Nsite Gateway ( Render its contents to the Shadow DOM )

For it to function as a full website with multiple routes there are a couple of ways to address this

    1.1) The site is a single page application where routing is done on the 

    1.2) The site is a traditional site with multiple routes