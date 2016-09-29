<?php 
    
    $thishost = $_SERVER['SERVER_NAME'];
//    echo $thishost;
    echo json_encode((object)getUrls($thishost));

function isLocal($host){
    if(strpos($host,'192.168') !== false){
        return true;
    }
    return $_SERVER["SERVER_NAME"]=="localhost";
}

function isProd($host){
    return strpos($host,"pichangamaker")!==false || strpos($host,"appspot.com")!==false;
}

function isDev($host){
    return strpos($host,"hf-backend.appspot.com")!==false;
}

function getUrls($host){
    
    $prod = array(
        "urlHost"=>"http://pm-elb-101114421.us-east-1.elb.amazonaws.com:3000",
        "kitchenUrl"=>"http://kitchen.huahfood.com"
    );

    $dev = array(
        "urlHost"=>"http://hf-backend-dev1.appspot.com",
        "kitchenUrl"=>"http://hf-kitchen-dev1.huahfood.com"
    );
    
    $local = array(
        "urlHost"=>"http://localhost:3000",
        "kitchenUrl"=>"http://localhost:11080"
    );

    if(isProd($host)){
        return $prod; 
    }else if(isDev($host)){
        return $dev;
    }else{
        return $local;
    }
}

    
        
