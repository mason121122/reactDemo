import React from "react";
import {Button} from "antd";

const Index = () => {
    const handleClick = () => {

    }
    return (
        <div>
            <div className='user'>
                <div className='flex-box'>
                    <Button type="primary" onClick={()=>handleClick('add')}>+新增</Button>
                </div>
            </div>
        </div>
    )
}

export default Index;