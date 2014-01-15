/**
 * @author JB
 */

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global SVGFactory,$*/

var Application = {
	question_num : 1000,
	questionsTotal_num : 1000,
	step_num : 0,
	display_$ : null,
	progressPointContainer_$ : null,
	application : null,
	steps_$ : null,

	QuestionManager : function() {"use strict";
		var context = this;
		this.conditionMet_bool = false;
		this.lastAnswer_str = "default";
		this.lastResult_str = "default";
		this.onChoiceMade = function() {

			// Event placeholder;

		};
		this.display = function(question_$) {

			Application.display_$.append(question_$);
			var responses_$ = question_$.find(".response");
			var moreInfo_$ = $("<div>en savoir plus</div>");
			moreInfo_$.addClass ("moreInfo");  
			
			responses_$.append (moreInfo_$); 
			responses_$.on("click", function() {
				var this_$ = $(this);
				this_$.find (".moreInfo").remove ();
				context.conditionMet_bool = this_$.attr("data-result") !== 'none';
				var currentProgressPoint_$ = $(".active");
				currentProgressPoint_$.toggleClass("active");
				context.lastAnswer_str = this_$.text();
				context.lastResult_str = this_$.attr("data-result");
				if (context.conditionMet_bool) {
					currentProgressPoint_$.toggleClass("conditionMet");

				} else {

					currentProgressPoint_$.toggleClass("conditionNotMet");

				}

				context.onChoiceMade();

			});

		};

	},

	StepManager : function(application, step_$) {"use strict";

		var questions_$, question_$, responses_$, n;

		var displayNextStep = function() {

		};

		var displayQuestion = function(question_num) {

			var question_$ = $(questions_$[question_num]);
			var questionManager = new Application.QuestionManager();
			$($(".progressPoint")[question_num]).toggleClass('active');
			var timeout = setTimeout(function() {
				questionManager.display(question_$);
			}, 1500);

			questionManager.onChoiceMade = function() {

				$('body .question, body .response').remove();
				//trace(questionManager.lastAnswer_str + "   /   " + this.lastAnswer_str);

				var timeout = setTimeout(function() {
					trace(questionManager.lastAnswer_str + "   /   " + this.lastAnswer_str);

					if (!questionManager.conditionMet_bool) {

						if (++application.question_num >= application.questionsTotal_num) {

							application.display_$.append(step_$.find(".endScreen .conditionNotMet"));
							feedBack_$.parent().find('.button').on("click", function() {

								application.nextStep();

							});

						} else {
							displayQuestion(application.question_num);

						}
					} else {
						/* temporary trash */
						
						trace("questionManager.lastResult_str : " + questionManager.lastResult_str)

						var reponse_v2_$ = step_$.find(".endScreen .conditionMet").find("." + questionManager.lastResult_str);
						trace("reponse_v2_$ :" + reponse_v2_$.length);
						
						
						if (reponse_v2_$.length !== 0) {
							step_$.find(".endScreen .conditionMet div").hide();
							reponse_v2_$.show();
							reponse_v2_$.addClass ("wipeFromBottom"); 
							application.display_$.append(step_$.find(".endScreen .conditionMet"));
							
							/* end temporary trash */

						} else {

							var feedBack_$ = $(step_$.find(".endScreen .conditionMet .feedBack"));
							feedBack_$.text(feedBack_$.text().replace("%result%", questionManager.lastAnswer_str));

							application.display_$.append(feedBack_$.parent());

							feedBack_$.parent().find('.button').on("click", function() {
								application.nextStep();

							});
						}

					}
				}, 1000);

			};

		};

		var nextStep = function() {

			displayQuestion(++application.question_num);

		};

		var init = function(step_$) {

			var name_$ = step_$.find(".name"), circle_params = new SVGFactory.Params();
			questions_$ = step_$.find(".questionSet");
			application.question_num = 0;
			application.questionsTotal_num = questions_$.length;

			for ( n = 0; n < questions_$.length; n++) {
				var progressPoint_$ = $("<span></span>");
				var textSpan_$ = $("<span></span>");
				textSpan_$.text(n + 1);

				progressPoint_$.append(SVGFactory.getShape(circle_params));
				progressPoint_$.append(textSpan_$);
				progressPoint_$.addClass("progressPoint");
				application.progressPointContainer_$.append(progressPoint_$);
			}
			application.display_$.prepend(name_$);

			displayQuestion(0);

		};

		init(step_$);

	},
	nextStep : function() {"use strict";
		$('body').empty();

		trace("nextstep");

		this.progressPointContainer_$ = $('<div id="progressPointContainer"></div>');
		this.display_$.append(this.progressPointContainer_$);

		var stepManager = new this.StepManager(this, $(this.steps_$[this.step_num]));
		this.step_num++;

	},

	init : function(display_$) {"use strict";
		var application = this;
		/* SET UP */
		this.steps_$ = $('.step');

		this.display_$ = display_$;

		$(".step").each(function(index, element) {

			var question_$ = $(element).find('.name h2');
			question_$.text(Number(1 + index) + ". " + question_$.text());

		});

		this.steps_$.detach();

		/*INTRO SCREEN */

		$('#intro .button').on("click", function() {
			$('#intro').detach();
			application.nextStep(0);

		});

	}
};

$(document).ready(function() {"use strict";
	Application.init($('body'));

});

