import React from 'react';
import Header from "../components/Header";
import "../styles/substanceCheck.scss"
import CheckConcentration from "../components/CheckConcentration";
import CreateSubstance from "../components/CreateSubstance";
import SubstancesList from "../components/SubstancesList";


const SubstanceCheck = () => {
    return (
        <div>
            <Header
                title="Проверка наличия и концентрации веществ"
                info={[
                    "Данное приложение помогает проверить наличие простых веществ в образце сложного.",
                    "Занесите простые вещества в базу с помощью соответствующей формы, после чего загрузите таблицу с результатами исследования сложного вещества и получите концентрацию (при наличии) в нем внесенных простых веществ.",
                    "Обратите внимание, что загружаемый файл должен иметь расширение .xls или .xslx, а так же содержать информацию в указанном формате."
                ]}
            />
            <CheckConcentration/>
            <SubstancesList/>
            <CreateSubstance/>
        </div>
    );
};

export default SubstanceCheck;