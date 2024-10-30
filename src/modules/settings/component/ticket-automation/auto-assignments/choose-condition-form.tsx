import { Chip, Typography } from "@mui/material"
import { TextboxField, TextboxFieldWithLabel } from "lib/form-fields"
import { FlexBox, VerticalSeparator } from "lib/ui-ux"
import { TicketConditions } from "./ticket-conditions"
import { FetchFieldsAndConditions, IAllAssignments } from "modules/settings/apis/ticket-automation";
import { Trans, useTranslation } from "react-i18next";

interface ChooseConditionFormProps {
    data: FetchFieldsAndConditions[],
    allAssignments?: IAllAssignments[];
    mode?: string;
    ruleName?: string
}

export const ChooseConditionForm = (props: ChooseConditionFormProps) => {
    const { data, allAssignments, mode, ruleName } = props;
    const { t } = useTranslation();

    const validateRuleName = (value: string) => {
        const modifiedData = mode === 'edit' ? allAssignments?.filter((item) => item.name !== ruleName) : allAssignments;
        const doesNameExist = modifiedData?.some((item) => item.name === value);
        if (doesNameExist) {
            return t('value_exists_validation');
        }
    }

    return (
        <FlexBox flexDirection="column" gap={'20px'}>
            <TextboxFieldWithLabel label={t('rule_name')} name="ruleName" size="small" rules={{ required: t('rule_name_validation'), validate: validateRuleName }} placeholder={t('enter_text_here')} />
            <FlexBox flexDirection="column" gap={'5px'}>
                <Typography variant="h6">{t('description')}</Typography>
                <TextboxField
                    name="description"
                    variant="outlined"
                    placeholder={t('enter_text_here')}
                    multiline
                    rows={4} />
            </FlexBox>
            <FlexBox flexDirection="column" alignItems="center" width="100%">
                <TicketConditions
                    fieldArrayName="allTicketConditions"
                    data={data}
                    heading={<Typography variant="body2"><Trans i18nKey={'rule_text_all_condtions'} /></Typography>} />
                <ConditionCombiner />
                <TicketConditions
                    fieldArrayName="anyTicketConditions"
                    data={data}
                    heading={<Typography variant="body2"><Trans i18nKey={'rule_text_any_condtions'} /></Typography>} />
            </FlexBox>
        </FlexBox>
    )
}

const ConditionCombiner = () => {
    const { t } = useTranslation();
    return (
        <>
            <VerticalSeparator />
            <Chip label={t('and')} />
            <VerticalSeparator />
        </>
    )
}