import React, { useEffect, useState } from 'react';
import { FallAnimation } from './FallAnimation';
import { ExplosionAnimation } from './ExplosionAnimation';
import Rocket from "../../../img/rocket.svg"
import Star from "../../../img/star_1.svg"
import StarBlur from "../../../img/star_2.svg"
import Point from "../../../img/point.svg"
import Explosion from "../../../img/explosion.gif"
import SkeletonInput from 'antd/lib/skeleton/Input';
import {RocketExplosionAnimation} from "./RocketExplosionAnimation";

export const RocketAnimation = (props: { multiplier: string, val: string }) => {


  return (
    <div style={{position:'relative', height:'max(200px, 35vh)', overflow:'hidden'}}>
        {
            props.multiplier === props.val &&
                <RocketExplosionAnimation />
        }
        {
            props.multiplier !== props.val &&
            <>
                <img src={Rocket} style={{width:'10em', height:'10em', position:'absolute',top:'50%', right:'50%', transform:'translate(50%, -50%)', zIndex:8}} alt="rocket" />
                <FallAnimation image={Star} maxPos={500} size={1 + Math.random() * (1.5 - 1)} delay={0} duration={3000}/>
                <FallAnimation image={Star} maxPos={500} size={1 + Math.random() * (1.5 - 1)} delay={0} duration={5000}/>

                <FallAnimation image={Point} maxPos={500} size={0.2} delay={0} duration={7000}/>
                <FallAnimation image={Point} maxPos={500} size={0.2} delay={1000} duration={7000}/>
                <FallAnimation image={Point} maxPos={500} size={0.2} delay={2000} duration={7000}/>
                <FallAnimation image={Point} maxPos={500} size={0.2} delay={3000} duration={7000}/>
                <FallAnimation image={Point} maxPos={500} size={0.2} delay={4000} duration={7000}/>
                <FallAnimation image={Point} maxPos={500} size={0.2} delay={5000} duration={7000}/>
                <FallAnimation image={Point} maxPos={500} size={0.2} delay={6000} duration={7000}/>
                <div style={{width:'10em', height:'10em', position:'absolute', top:'50%', right:'50%', transform:'translate(60%, 30%)', zIndex:10}}>
                    <ExplosionAnimation  />
                </div>
            </>
        }
    </div>
  )
}
