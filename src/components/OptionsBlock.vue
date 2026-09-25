<script setup lang="ts">
    import { reactive, computed, ref } from 'vue'
    
    import { useI18n } from 'vue-i18n';
    const {t} = useI18n();

    import { required, minValue, maxValue, integer } from '@vuelidate/validators'
    import useVuelidate from '@vuelidate/core'
    import {
        DEFAULT_NUM_EQUATIONS, 
        initially_selected_operations, 
        MAX_NUM_EQUATIONS,
        num_upper_limit_list
    } from '../util/constants'

    import { 
        get_operations,
    } from '../util/operations';

    import { ElSelect, ElOption, 
             ElContainer, ElForm, ElFormItem,
             ElInput, ElInputNumber,
             ElCheckboxGroup, ElCheckbox, 
             ElRow, ElCol } from 'element-plus'

    import 'element-plus/es/components/select/style/css'
    import 'element-plus/es/components/option/style/css'

    

    const onStart = (event: Event) => {
        event.preventDefault();
        console.log(event);
    }

    const onChange = (event: Event) => {
        console.log(equation_options);
    }

    //app options
    const equation_options = reactive({
        numberOfEquations: DEFAULT_NUM_EQUATIONS,
        operations: get_operations(),
        active_operation_ids: initially_selected_operations,
        current_num_max: num_upper_limit_list[0],
        user: {
            name: 'Guest'
        }
    })

    const validations = computed(() => ({
        numberOfEquations: {
            required, integer, 
            min: minValue(1), 
            max: maxValue(MAX_NUM_EQUATIONS)
        }
    }))

    const v$ = useVuelidate(validations, equation_options);

</script>



<template>


  <el-row id="intro-top" justify="center" align="middle">
    <div>
        <el-form :inline="true">
            <el-form-item>
                {{ t('hello') }},
            </el-form-item>    

            <el-form-item>
                <el-input v-model="equation_options.user.name" 
                    :placeholder="t('pls_enter_your_name')"
                    id="user-name-input"
                />
            </el-form-item>

            <el-form-item>
                {{ t('lets_do_few') }}

            </el-form-item>

            <el-form-item>
                <el-input-number id="input-num-exercises" 
                                 v-model="equation_options.numberOfEquations"
                                 :state="v$.numberOfEquations.$error ? false : null"
                                 @input="v$.numberOfEquations.$touch()"
                                 :min="1"
                                 :max="MAX_NUM_EQUATIONS"
                                 />
            </el-form-item>

            <el-form-item>{{ t('exercises') }}.</el-form-item>

        </el-form>
    </div>
  </el-row>


  <el-divider>Please adjust exercise complexity</el-divider>


  <el-row :gutter="0" align="middle">
    <el-col :span="11" class="centered-col">
        <div>
            <el-checkbox-group v-model="equation_options.active_operation_ids">
                <el-checkbox 
                    v-for="op in equation_options.operations"
                    :key="op.id"
                    :value="op.id"
                    >
                    {{ t(op.label)}} ({{op.symbol}}) 
                </el-checkbox>

            </el-checkbox-group>
        </div>
    </el-col>

    <el-col :span="2" class="centered-col">
        <el-divider direction="vertical" />
    </el-col>
    <el-col :span="11" class="centered-col select-wrapper">
        <div>
            {{ t('i_can_compute_numbers_up_to') }}
            <el-select v-model="equation_options.current_num_max"
            style="width: 100px;">
                <el-option 
                v-for="alimit in num_upper_limit_list"
                :key="alimit" :label="alimit" :value="alimit">
                </el-option>
            </el-select>
        </div>
    </el-col>
  </el-row>

  <el-divider />
  
    <div>
        <p> current number of eqs: {{equation_options.numberOfEquations}}</p>
        <p> ops {{ equation_options.operations }} </p>
        <p> user name: {{ equation_options.user.name }} </p>
        <p> current max mnumber: {{ equation_options.current_num_max }}</p>
        <p>active_operation_ids: {{ equation_options.active_operation_ids }}</p>
    </div>
        


</template>

<style>
    #input-num-exercises {
        max-width: 100px;
        text-align: right;
    }

    #user-name-input{
        max-width: 200px;
        text-align: center;
        
    }

    .el-row {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        padding: 10px;
    }

    .centered-col {
        display: flex;
        justify-content: center; /* Centers horizontally */
        align-items: center;     /* Optional: Centers vertically too */
        text-align: center;
    }

    #intro-top{
        margin-top: 50px;
        justify-content: center;
    }

    /* 2. Keeps the label and the select dropdown cleanly inline side-by-side */
    .select-wrapper {
        display: inline-flex;
        align-items: center;
    }


    :deep(.el-divider--vertical) {
        margin: 0 0;                 /* Adjust spacing if needed */
        display: inline-block;
    }

</style>