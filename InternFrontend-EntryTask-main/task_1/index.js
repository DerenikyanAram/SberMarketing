import {encoded, translations} from './data.js'
function decodeEncodedData(encoded, translations) {
    // Создаем пустой список для хранения уникальных id
    const uniqueIds = new Set();

    // Проходимся по каждому объекту в списке encoded
    const decodedData = encoded.map(item => {
        // Создаем новый объект для хранения расшифрованных данных
        const decodedItem = {};

        // Проходимся по ключам объекта
        Object.keys(item).forEach(key => {
            // Если ключ оканчивается на "Id" и не является одним из исключенных полей
            if (key.endsWith("Id") && !["groupId", "service", "formatSize", "ca"].includes(key)) {
                // Получаем значение ключа
                const value = item[key];
                // Добавляем значение в список уникальных id
                uniqueIds.add(value);
                // Если значение есть в словаре translations, то расшифровываем его, иначе оставляем без изменений
                decodedItem[key] = translations[value] || value;
            } else {
                // Если ключ не оканчивается на "Id" или является одним из исключенных полей, оставляем его без изменений
                decodedItem[key] = item[key];
            }
        });

        // Возвращаем расшифрованный объект
        return decodedItem;
    });

    // Возвращаем расшифрованные данные и список уникальных id
    return { decodedData, uniqueIds: Array.from(uniqueIds) };
}


const { decodedData, uniqueIds } = decodeEncodedData(encoded, translations);
console.log("Расшифрованные данные:", decodedData);
console.log("Уникальные id:", uniqueIds);
console.log("Let's rock")
// console.log(encoded, translations)



