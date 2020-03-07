import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const messages = {
  'fr': {'hello': 'Salut',
         'pls_enter_your_name': 'Entrez votre nom SVP',
         'lets_do_few_exercises': 'faisons quelques exercices',
         'yes_lets_start': 'Oui, on commence',
         'enter_missing_numbers': 'Entrez les nombres manquants',
         'well_played': 'Bien joué',
         'the_answer_is': 'La reponse est',
         'exercise_is_finished': "L'exercice est terminé",
         'it_took_you': "ça vous a pris",
         'you_are_a_genius': "vous êtes un genie",
         'well_played_but_there_is_space_for_improvement': "bien joué, mais il y a de l'espace pour amelioration",
         'you_have_to_practice_more': "il faut pratiquer plus",
         'try_to_speed_up': "Essayez de faire les calculs plus vite",
         'about': "À propos",
         'integer_is_required': "Un entier est requis"
        },
  'en': {'hello': 'Hi',
         'pls_enter_your_name': 'Please enter your name',
         'lets_do_few_exercises': "let's do few exercises",
         'yes_lets_start': "Yes, start",
         'enter_missing_numbers': "Enter missing numbers",
         'well_played': 'Well played',
         'the_answer_is': 'The answer is',
         'exercise_is_finished': 'The exercise is completed',
         'it_took_you': "it took you",
         'you_are_a_genius': "you are a genius",
         'well_played_but_there_is_space_for_improvement': "well played, but there is still space for improvement",
         'you_have_to_practice_more': "you have to practice more",
         'try_to_speed_up': "Try to speed up your calculations",
         'about': "About",
         'integer_is_required': "An integer is required"
        }
}

export const i18n = new VueI18n({    locale: 'fr', // set locale
                                fallbackLocale: 'en', // set fallback locale
                                messages: messages, // set locale messages
});
