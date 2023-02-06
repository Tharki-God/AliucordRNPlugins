import { Options } from '@swc/core';
import { Plugin } from 'rollup';
import { FilterPattern } from '@rollup/pluginutils';
declare type SWCPluginOptions<O = Options> = Pick<O, Exclude<keyof O, 'filename'>>;
declare type RollupOptions = {
    rollup?: {
        include: FilterPattern;
        exclude: FilterPattern;
    };
};
declare type PluginOptions = SWCPluginOptions & RollupOptions;
declare type RollupPluginSWC = (options?: PluginOptions) => Plugin;
declare const swc: RollupPluginSWC;
export default swc;
