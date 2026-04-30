export function formatSeconds(seconds: number){
    const minutos = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secondsMod = String(Math.floor(seconds % 60)).padStart(2, '0');;
    return `${minutos}:${secondsMod}`
}