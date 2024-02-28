export function setInitForm (data,fields= [],setValue) {
    fields.forEach(field => {
        setValue(field,data[field])
    })
 }