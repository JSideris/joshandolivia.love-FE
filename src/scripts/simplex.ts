import { createNoise3D } from "simplex-noise";
import { NoiseFunction3D } from "simplex-noise";

export default function simplex(noiseScale: number){

	let noise = createNoise3D(Math.random);
	return (x: number, y: number, z: number)=>{
		
		return (noise((x) * noiseScale, (y) * noiseScale, (z) * noiseScale) + 1) / 2;
	}
}