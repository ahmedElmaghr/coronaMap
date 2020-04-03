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
    console.log(string)
    var splitted = string.split(`,`).join('');
    console.log(splitted)

    return splitted;
  }

  const stringVirSepToNumber = (string)=>{
    var stringWithoutSpecChar = deleteSpecialChar(string);
    console.log(stringWithoutSpecChar)
    return parseInt(stringWithoutSpecChar,10);
  }
export default { isNotEmpty,deleteSpecialChar,stringVirSepToNumber};