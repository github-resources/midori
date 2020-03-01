import { DepthTexture, Mesh, MeshBasicMaterial, Pass, PerspectiveCamera, PlaneGeometry, Points, Texture, WebGLRenderTarget, WebGLRenderer } from 'three';

export declare const Easings: {
	Linear: {
		None: any;
	};
	Quadratic: {
		In: any;
		Out: any;
		InOut: any;
	};
	Cubic: {
		In: any;
		Out: any;
		InOut: any;
	};
	Quartic: {
		In: any;
		Out: any;
		InOut: any;
	};
	Quintic: {
		In: any;
		Out: any;
		InOut: any;
	};
	Sinusoidal: {
		In: any;
		Out: any;
		InOut: any;
	};
	Exponential: {
		In: any;
		Out: any;
		InOut: any;
	};
	Circular: {
		In: any;
		Out: any;
		InOut: any;
	};
	Elastic: {
		In: any;
		Out: any;
		InOut: any;
	};
	Back: {
		In: any;
		Out: any;
		InOut: any;
	};
	Bounce: {
		In: any;
		Out: any;
		InOut: any;
	};
};
export interface TransitionConfig {
	duration?: number;
	delay?: number;
	easing?: (k: number) => number;
	onInit?: (...args: any[]) => void;
	onStart?: (...args: any[]) => void;
	onUpdate?: (...args: any[]) => void;
	onComplete?: (...args: any[]) => void;
	onStop?: (...args: any[]) => void;
}
export interface LoopableTransitionConfig extends TransitionConfig {
	loop?: boolean;
}
export interface BackgroundTransitionConfig extends TransitionConfig {
	onInit?: (prevBackground?: Background, nextBackground?: Background) => void;
	onStart?: (prevBackground?: Background, nextBackground?: Background) => void;
	onUpdate?: (prevBackground?: Background, nextBackground?: Background) => void;
	onComplete?: (prevBackground?: Background, nextBackground?: Background) => void;
	onStop?: (prevBackground?: Background, nextBackground?: Background) => void;
}
export interface CameraPosition {
	x?: number;
	y?: number;
	z?: number;
}
export interface CameraPositionWithRotation extends CameraPosition {
	zr?: number;
}
export declare type CameraOffset = CameraPositionWithRotation;
export declare class BackgroundCamera {
	private _plane;
	readonly camera: PerspectiveCamera;
	private readonly _position;
	private readonly _positionWithOffset;
	private _positionTransition;
	private _rotationTransition;
	private readonly _swayOffset;
	private _swayTransition;
	/**
	 * Constructs a BackgroundCamera using a Background's plane.
	 * @param {PlaneMesh} plane - a three.js plane mesh representing the background.
	 * @param {Number} width - the width of the camera.
	 * @param {Number} height - the height of the camera.
	 */
	constructor(plane: PlaneMesh, width: number, height: number);
	/**
	 * Returns the current position of the camera.
	 * @returns CameraPositionWithRotation
	 */
	get position(): CameraPositionWithRotation;
	/**
	 * Returns whether the camera is currently moving.
	 * @returns boolean
	 */
	isMoving(): boolean;
	/**
	 * Returns whether the camera is currently rotating.
	 * @returns boolean
	 */
	isRotating(): boolean;
	/**
	 * Returns whether the camera is currently swaying.
	 * @returns boolean
	 */
	isSwaying(): boolean;
	/**
	 * Sets the size of the camera.
	 * @param {number} width
	 * @param {number} height
	 */
	setSize(width: number, height: number): void;
	/**
	 * Sways the camera around its position. Cancels any in-progress sways.
	 * @param {CameraOffset | boolean} offset - the offset to sway on each axis in relative units from 0 to 1.
	 * The rotation offset (zr) must be specified in units of degrees.
	 * The x/y offsets should be set based off a z of 1 and will be scaled down appropriately based on the camera's current z position.
	 * If a boolean is passed in instead then the sway will either continue or stop based on the value.
	 * @param {LoopableTransitionConfig} transition - optional configuration for a transition.
	 */
	sway(offset: CameraOffset | boolean, transition?: LoopableTransitionConfig): void;
	/**
	 * Rotates the camera on its z-axis. Cancels any in-progress rotations.
	 * @param {number | boolean} angle - the angle to rotate in degrees.
	 * If a boolean is passed in instead then the rotation will either continue or stop based on the value.
	 * @param {TransitionConfig} transition - optional configuration for a transition.
	 */
	rotate(angle: number | boolean, transition?: TransitionConfig): void;
	/**
	 * Moves the camera to a relative position on the background. Cancels any in-progress moves.
	 * @param {CameraPosition | boolean} position - the position to move towards on each axis in relative units from 0 to 1.
	 * If a boolean is passed in instead then the move will either continue or stop based on the value.
	 * @param {TransitionConfig} transition - optional configuration for a transition.
	 */
	move(position: CameraPosition | boolean, transition?: TransitionConfig): void;
	/**
	 * Updates the camera position. Should be called on every render frame.
	 */
	update(): void;
	/**
	 * Disposes this object. Call when this object is no longer needed, otherwise leaks may occur.
	 */
	dispose(): void;
}
export declare type Uniforms = {
	[uniform: string]: any;
};
export declare enum EffectType {
	Blur = "Blur",
	Bloom = "Bloom",
	RgbShift = "RgbShift",
	Vignette = "Vignette",
	VignetteBlur = "VignetteBlur",
	MotionBlur = "MotionBlur",
	Glitch = "Glitch"
}
export interface IEffect {
	render(...args: any[]): any;
	setSize?(width: number, height: number): any;
	getUniforms(): Uniforms;
	updateUniforms(uniforms: Uniforms): any;
	clearUniforms(): any;
	dispose(): any;
}
export interface BlurEffectConfig {
	radius?: number;
	passes?: number;
}
export interface BloomEffectConfig {
	opacity?: number;
	radius?: number;
	passes?: number;
}
export interface RgbShiftEffectConfig {
	amount?: number;
	angle?: number;
}
export interface VignetteEffectConfig {
	offset?: number;
	darkness?: number;
}
export interface VignetteBlurEffectConfig {
	size?: number;
	radius?: number;
	passes?: number;
}
export interface GlitchEffectConfig {
	amount?: number;
	seed?: number;
}
export interface EffectConfigs {
	[EffectType.Blur]?: BlurEffectConfig;
	[EffectType.Bloom]?: BloomEffectConfig;
	[EffectType.RgbShift]?: RgbShiftEffectConfig;
	[EffectType.Vignette]?: VignetteEffectConfig;
	[EffectType.VignetteBlur]?: VignetteBlurEffectConfig;
	[EffectType.Glitch]?: GlitchEffectConfig;
}
export declare type EffectMap = {
	[effect in EffectType]?: IEffect;
};
export declare class EffectPass extends Pass {
	private _width;
	private _height;
	private _readBuffer;
	private _writeBuffer;
	private _copyShader;
	protected _effects: EffectMap;
	/**
	 * Constructs an EffectPass.
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(width: number, height: number);
	/**
	 * Sets the size of the EffectPass.
	 * @param {number} width
	 * @param {number} height
	 */
	setSize(width: number, height: number): void;
	/**
	 * Returns the configurations for the currently set effects.
	 * @returns EffectConfigs
	 */
	getConfigs(): EffectConfigs;
	/**
	 * Returns whether a specified effect is currently set.
	 * @param {EffectType} type
	 * @returns boolean
	 */
	hasEffect(type: EffectType): boolean;
	/**
	 * Returns whether any effects are currently set.
	 * @returns boolean
	 */
	hasEffects(): boolean;
	/**
	 * Returns the current effect for the specified type.
	 * If no effect is currently set for the type, creates a new effect for the type and returns it.
	 * @param {EffectType} type
	 * @param {EffectConfig} config
	 * @returns IEffect
	 */
	protected _getEffect(type: EffectType): IEffect;
	/**
	 * Sets an effect. If an effect is already set, updates the set effect.
	 * @param {EffectType} type - the effect to set.
	 * @param {Object} config - configuration specific to the effect specified.
	 */
	set(type: EffectType.Blur, config: BlurEffectConfig): any;
	set(type: EffectType.Bloom, config: BloomEffectConfig): any;
	set(type: EffectType.RgbShift, config: RgbShiftEffectConfig): any;
	set(type: EffectType.Vignette, config: VignetteEffectConfig): any;
	set(type: EffectType.VignetteBlur, config: VignetteBlurEffectConfig): any;
	set(type: EffectType.Glitch, config: GlitchEffectConfig): any;
	/**
	 * Removes a set effect. Returns true if the effect was removed, otherwise false.
	 * @param {EffectType} type - the type of the effect.
	 * @returns boolean
	 */
	remove(type: EffectType): boolean;
	/**
	 * Removes all set effects.
	 */
	removeAll(): void;
	/**
	 * Swaps the internal read and write buffers. Should be called each time after rendering an effect.
	 */
	private _swapBuffers;
	/**
	 * Renders the effects.
	 * @param {WebGLRenderer} renderer - the renderer to use.
	 * @param {WebGLRenderTarget} writeBuffer - the buffer to render to, or null to render directly to screen.
	 * @param {WebGLRenderTarget} readBuffer - the buffer to read from.
	 */
	render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget): void;
	/**
	 * Disposes this object. Call when this object is no longer needed, otherwise leaks may occur.
	 */
	dispose(): void;
}
export interface MotionBlurEffectConfig {
	intensity?: number;
	samples?: number;
}
export interface BackgroundEffectConfigs extends EffectConfigs {
	[EffectType.MotionBlur]?: MotionBlurEffectConfig;
}
export declare class BackgroundEffects extends EffectPass {
	private _camera;
	private _depthTexture;
	/**
	 * Constructs a BackgroundEffects object.
	 * @param {number} width
	 * @param {number} height
	 * @param {PerspectiveCamera} camera - a camera for motion blur support
	 * @param {DepthTexture} depthTexture - a depth texture for motion blur support
	 */
	constructor(width: number, height: number, camera: PerspectiveCamera, depthTexture: DepthTexture);
	/**
	 * Returns the configurations for the currently set effects.
	 * @returns BackgroundEffectConfigs
	 */
	getConfigs(): BackgroundEffectConfigs;
	/**
	 * Returns the current effect for the specified type.
	 * If no effect is currently set for the type, creates a new effect for the type and returns it.
	 * @param {EffectType} type
	 * @param {EffectConfig} config
	 * @returns IEffect
	 */
	protected _getEffect(type: EffectType): IEffect;
	/**
	 * Sets an effect. If an effect is already set, updates the set effect.
	 * @param {EffectType} type - the effect to set.
	 * @param {Object} config - configuration specific to the effect specified.
	 */
	set(type: EffectType.Blur, config: BlurEffectConfig): any;
	set(type: EffectType.Bloom, config: BloomEffectConfig): any;
	set(type: EffectType.RgbShift, config: RgbShiftEffectConfig): any;
	set(type: EffectType.Vignette, config: VignetteEffectConfig): any;
	set(type: EffectType.VignetteBlur, config: VignetteBlurEffectConfig): any;
	set(type: EffectType.MotionBlur, config: MotionBlurEffectConfig): any;
	set(type: EffectType.Glitch, config: GlitchEffectConfig): any;
}
export interface ParticleMoveOffset {
	distance: number;
	angle: number;
}
export interface ParticleSwayOffset {
	x: number;
	y: number;
}
export declare type ParticleGroupConfigs = {
	[name: string]: ParticleGroupConfig;
};
export interface ParticleGroupConfig {
	name: string;
	amount: number;
	minSize?: number;
	maxSize?: number;
	minGradient?: number;
	maxGradient?: number;
	minOpacity?: number;
	maxOpacity?: number;
	color?: number;
}
export declare class Particles {
	private _width;
	private _height;
	private _maxDepth;
	private _groups;
	private _particles;
	private _positions;
	/**
	 * Constructs a Particles object.
	 * @param {number} width
	 * @param {number} height
	 * @param {number} maxDepth - the maximum depth of the particles in world units.
	 */
	constructor(width: number, height: number, maxDepth: number);
	/**
	 * Returns the configurations for the currently set particle groups.
	 * @returns ParticleGroupDefinitionMap
	 */
	getConfigs(): ParticleGroupConfigs;
	/**
	 * Returns whether a group of particles is currently moving.
	 * @param {string} name - the name of the particle group.
	 * @returns boolean
	 */
	isMoving(name: string): boolean;
	/**
	 * Returns whether a group of particles is currently swaying.
	 * @param {string} name - the name of the particle group.
	 * @returns boolean
	 */
	isSwaying(name: string): boolean;
	/**
	 * Generates particles based on a given set of configurations.
	 * @param {ParticleGroupConfig | ParticleGroupConfig[]} config - a single or array of particle group configurations.
	 */
	generate(configs: ParticleGroupConfig | ParticleGroupConfig[]): void;
	/**
	 * Calculates a new position based off an existing position and optional offset. Will wrap around boundaries.
	 * @param {Vector2} position - the current position.
	 * @param {Vector2} offset - the offset from the current position.
	 * @returns Vector2
	 */
	private _getNewPosition;
	/**
	 * Updates the internal positions for particles. This does NOT update the attributes of the BufferGeometry.
	 * @param {number} index - the index to start at.
	 * @param {number} amount - the number of particles.
	 * @param {number[]} positions - an array containing the position values to use.
	 * @param {Vector2} offset - an optional offset to apply to all new position values.
	 */
	private _updatePositions;
	/**
	 * Moves a group of particles. Cancels any in-progress moves.
	 * @param {string} name - the name of the group to move.
	 * @param {ParticleMoveOffset | boolean} offset - the distance and angle in radians to move.
	 * If a boolean is passed in instead then the move will either continue or stop based on the value.
	 * @param {LoopableTransitionConfig} transition - an optional transition configuration.
	 */
	move(name: string, offset: ParticleMoveOffset | boolean, transition: LoopableTransitionConfig): void;
	/**
	 * Sways a group of particles around their current positions. Cancels any in-progress sways.
	 * @param {string} name - the name of the group to sway.
	 * @param {ParticleSwayOffset | boolean} offset - the distances in world units allowed on each axis for swaying.
	 * If a boolean is passed in instead then the sway will either continue or stop based on the value.
	 * @param {LoopableTransitionConfig} transition - optional configuration for a transition.
	 */
	sway(name: string, offset: ParticleSwayOffset | boolean, transition?: LoopableTransitionConfig): void;
	/**
	 * Generates a new random averaged value based off a given value and its range.
	 * @param {number} value - the value to use.
	 * @param {number} minValue - the minimum value for the given value.
	 * @param {number} maxValue - the maximum value for the given value.
	 * @returns number
	 */
	private _generateNewRandomAveragedValue;
	/**
	 * Updates the positions of the particles. Should be called on every render frame.
	 */
	update(): void;
	/**
	 * Returns a three.js object containing the particles.
	 * To use the particles, add this object into a three.js scene.
	 * @returns Points
	 */
	get object(): Points;
	/**
	 * Disposes this object. Call when this object is no longer needed, otherwise leaks may occur.
	 */
	dispose(): void;
}
export interface PlaneMesh extends Mesh {
	geometry: PlaneGeometry;
	material: MeshBasicMaterial;
}
export declare class Background {
	private readonly _buffer;
	private readonly _plane;
	private readonly _scene;
	readonly camera: BackgroundCamera;
	readonly particles: Particles;
	readonly effects: BackgroundEffects;
	/**
	 * Constructs a background.
	 * @param {Texture} texture
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(texture: Texture, width: number, height: number);
	/**
	 * Sets the size of the background.
	 * @param {number} width
	 * @param {number} height
	 */
	setSize(width: number, height: number): void;
	/**
	 * Renders the background.
	 * @param {WebGLRenderer} renderer - the renderer to use.
	 * @param {WebGLRenderTarget} writeBuffer - the buffer to render to, or null to render directly to screen.
	 */
	render(renderer: WebGLRenderer, writeBuffer?: WebGLRenderTarget): void;
	/**
	 * Disposes this object. Call when this object is no longer needed, otherwise leaks may occur.
	 */
	dispose(): void;
}
/**
 * @author aeroheim / http://aeroheim.moe/
 */
export declare enum WipeDirection {
	Left = 0,
	Right = 1,
	Top = 2,
	Bottom = 3
}
/**
 * @author aeroheim / http://aeroheim.moe/
 */
export declare enum SlideDirection {
	Left = 0,
	Right = 1,
	Top = 2,
	Bottom = 3
}
export declare enum TransitionType {
	None = "None",
	Blend = "Blend",
	Blur = "Blur",
	Wipe = "Wipe",
	Slide = "Slide",
	Glitch = "Glitch"
}
export interface BlendTransitionConfig extends BackgroundTransitionConfig {
}
export interface WipeTransitionConfig extends BackgroundTransitionConfig {
	gradient?: number;
	angle?: number;
	direction?: WipeDirection;
}
export interface SlideTransitionConfig extends BackgroundTransitionConfig {
	slides?: number;
	intensity?: number;
	samples?: number;
	direction?: SlideDirection;
}
export interface BlurTransitionConfig extends BackgroundTransitionConfig {
	intensity?: number;
	samples?: number;
}
export interface GlitchTransitionConfig extends BackgroundTransitionConfig {
	seed?: number;
}
export declare type Transition = BlendTransition | WipeTransition | SlideTransition | BlurTransition | GlitchTransition;
export interface BlendTransition extends BackgroundTransitionConfig {
	type: TransitionType.Blend;
	config: BlendTransitionConfig;
}
export interface WipeTransition extends BackgroundTransitionConfig {
	type: TransitionType.Wipe;
	config: WipeTransitionConfig;
}
export interface SlideTransition extends BackgroundTransitionConfig {
	type: TransitionType.Slide;
	config: SlideTransitionConfig;
}
export interface BlurTransition extends BackgroundTransitionConfig {
	type: TransitionType.Blur;
	config: BlurTransitionConfig;
}
export interface GlitchTransition extends BackgroundTransitionConfig {
	type: TransitionType.Glitch;
	config: GlitchTransitionConfig;
}
/**
 * Returns whether WebGL support is available.
 * @returns boolean
 */
export declare function isWebGLSupported(): boolean;
/**
 * Loads an image as a texture.
 * @param {string} path - path to the image file.
 * @return Promise<Texture> - texture on success, error on failure.
 */
export declare function loadImage(path: string): Promise<Texture>;
export declare class BackgroundRenderer {
	private _renderer;
	private _composer;
	private _background;
	private _backgroundPass;
	private _transitionPass;
	private _effectPass;
	private _disposed;
	/**
	 * Constructs a renderer.
	 * @param {HTMLCanvasElement} canvas - the canvas element to use.
	 */
	constructor(canvas: HTMLCanvasElement);
	/**
	 * Returns the global effects.
	 * Effects set on this will apply to all backgrounds.
	 * @returns EffectPass
	 */
	get effects(): EffectPass;
	/**
	 * Returns the current background.
	 * @returns Background
	 */
	get background(): Background;
	/**
	 * Returns whether the background is currently transitioning.
	 * @returns boolean
	 */
	isTransitioning(): boolean;
	/**
	 * Sets the current background.
	 * @param {Texture} texture - the image to use for the background.
	 * @param {Transition} transition - optional configuration for a transition.
	 */
	setBackground(texture: Texture, transition?: Transition): void;
	/**
	 * Resizes the canvas if necessary. Should be called on every render frame.
	 */
	private _resizeCanvas;
	/**
	 * Renders the background, transitions, and effects. Should be called on every frame.
	 */
	private _render;
	/**
	 * Disposes this object. Call when this object is no longer needed, otherwise leaks may occur.
	 */
	dispose(): void;
}

export {};