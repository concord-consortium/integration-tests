const assignPageElements = {
    ASSIGN_TEXT : '[id^=\"assignModal\"] [id^=\"assignCol\"] p:first-of-type',
    CLASSES_HEADER : '#clazz_summary_data [class^=assignClassHeader]',
    CLASS_NAME : '#clazz_summary_data [class^=classListContainer] li',
    CLASS_CHECKBOX : '.unassigned_activity_class',
    SAVE_BUTTON : '#clazz_summary_data .button',
    CANCEL_BUTTON : '#clazz_summary_data button',
    CONFIRM_DIALOG_TEXT : '[class^=confirmDialogPortal] p',
    CONFIRM_DIALOG_OK : '[class^=confirmDialogPortal] button'
};

export default assignPageElements;
