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

## 2) Nsite Gateway Deploy Instructions  

**~ 15 min guide**  

#### **2.2.1) Clone the Gateway Repository**  
Go to the [Nsite-Gateway GitHub Repo](https://github.com/Nsite-Info/Nsite-Gateway) and select **Use this template** to clone it.  

![Clone Repo](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/1.png)

#### **2.2.2) Deploy on Cloudflare or Vercel** *(Cloudflare Example Below)*  
1. Log in to your **Cloudflare** or **Vercel** account.  
2. Navigate to **Workers & Pages** in the left menu.  

![Workers & Pages ](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/9.png)

3. Click **Create** in the Worker or Page modal.  

![Click create](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/10.png)

4. Select **Pages** and connect the cloned Gateway repo via Git.  

![Select Pages](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/11.png)

5. Select the gateway repo and start the setup.  

![Select Github Repo](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/12.png)

6. Choose **Nuxt.js** as the framework preset, then **Save & Deploy**.  

![Select Nuxt Framework](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/13.png)

*⏳ This may take a few minutes to fully propagate, even when deployed it might take a couple minutes*  

![Cloudflare Deployed](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/14.png)

When you visit the newly deployed page it might take a little bit for cloudflare to display but you should be greeted with this black page.

![Empty Gateway](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/15.png)

#### **2.2.3) Configure npub in Your Repo**  
1. In your cloned **GitHub repo**, open the required config file.  
2. Click the **pencil icon** to edit.  

![Config Gateway](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/16.png)

3. Replace the `npub` value with yours, set gateway to false and singlesite to true.  

![Clone Repo](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/16.png)

4. Commit the changes and redeploy, should look like this but also with your npub filled in.

![Clone Repo](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/17.png)  

#### **2.2.4) Add a Custom Domain**  
- Both **Cloudflare** & **Vercel** will prompt you to set your domain’s **NameServers**.  
- Once propagated, you can attach the domain to the project.  

![Clone Repo](https://raw.githubusercontent.com/Nsite-Info/Nsite-Basics/refs/heads/main/images/18.png)

---

🚀 **You’re now set up with Nsite!** 🚀  
Your Nsite should be accessible via the gateway and any connected custom domain.
