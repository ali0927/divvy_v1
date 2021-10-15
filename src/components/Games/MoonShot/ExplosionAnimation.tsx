import React, { useEffect, useState } from 'react';
import Explosion from "../../../img/explosion.gif"

export const ExplosionAnimation = () => {
    const [isExplosion, setIsExplosion] = useState(false)
    useEffect(() => {
      setTimeout(() => {
        setIsExplosion(!isExplosion)
      }, isExplosion ? 1000: 3000)
    }, [isExplosion])
    return (
        <>
        { isExplosion &&
        <img src={Explosion} style={{width:'100%', transform:'rotate(180deg)'}} alt="explosion" />
        }
        </>
    )
}
