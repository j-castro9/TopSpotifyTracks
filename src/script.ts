export default {
  base: '/',
};
import { redirectToAuthCodeFlow, getAccessToken } from "/authCode";

const clientId = "5f56bd6a2551494ca8579167c145bedf";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if(!code){
    redirectToAuthCodeFlow(clientId);
}else{
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const track = await fetchData(accessToken);

    populateUI(profile);
    populateU(track)

}


async function fetchProfile(code: string): Promise<UserProfile>{
    const result = await fetch("https://api.spotify.com/v1/me",{
        method: "GET", headers: {Authorization: `Bearer ${code}` }
    });
    
    return await result.json();
}

async function fetchData(code: string): Promise<UserProfile>{
    const result1 = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0",{
        method: "GET", headers: {Authorization: `Bearer ${code}` }
    });
    
    return await result1.json();
}

function populateUI(profile: UserProfile){
    document.getElementById("displayName")!.innerText = profile.display_name;
    document.getElementById("avatar")!.setAttribute("src", profile.images[0].url)
    document.getElementById("id")!.innerText = profile.id;
    document.getElementById("email")!.innerText = profile.email;
    document.getElementById("uri")!.innerText = profile.uri;
    document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url")!.innerText = profile.href;
    document.getElementById("url")!.setAttribute("href", profile.href);
    document.getElementById("imgUrl")!.innerText = profile.images[0].url;

}

function populateU(profile: UserProfile){
    for(let i =0;i<10;i++){
        let c = "num"+(i+1); 
        document.getElementById(c)!.innerText = profile.items[i].name;
    }
}
