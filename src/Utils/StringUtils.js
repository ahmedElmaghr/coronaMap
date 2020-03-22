  //verify string not empty
  const isNotEmpty = entity => {
   return entity != "" && entity != null;
   //    return entity != null && entity.trim() != "";

  };

  //
  const deleteSpecialChar = (string)=>{
    if(typeof string != "string"){
      throw "formatStringToNumber is applied only on string format"
    }
    return string.replace(`,`, '');
  }
export default { isNotEmpty,deleteSpecialChar};