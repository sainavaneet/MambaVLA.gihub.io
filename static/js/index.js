window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  // Only preload if the interpolation elements exist
  var interpolationWrapper = document.getElementById('interpolation-image-wrapper');
  if (!interpolationWrapper) {
    return;
  }
  
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var interpolationWrapper = document.getElementById('interpolation-image-wrapper');
  if (!interpolationWrapper) {
    return;
  }
  
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    // Code for the interpolation slider control.
    var interpolationSlider = document.getElementById('interpolation-slider');
    if (interpolationSlider) {
      interpolationSlider.oninput = function() {
        setInterpolationImage(this.value);
      };
      setInterpolationImage(0);
      $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);
    }

    // Only attach bulmaSlider if slider elements exist
    var sliderElements = document.querySelectorAll('.slider');
    if (sliderElements.length > 0) {
      bulmaSlider.attach();
    }

    // Code for the libero videos dropdown toggle.
    var liberoVideosToggleButton = document.querySelector('.toggle-libero-videos');
    var liberoVideosContent = document.getElementById('libero-videos-content');

    if (liberoVideosToggleButton && liberoVideosContent) {
      liberoVideosToggleButton.addEventListener('click', function() {
        if (liberoVideosContent.classList.contains('is-hidden')) {
          liberoVideosContent.classList.remove('is-hidden');
          liberoVideosToggleButton.querySelector('span:first-child').textContent = 'Hide Videos';
          liberoVideosToggleButton.querySelector('.icon i').classList.remove('fa-angle-down');
          liberoVideosToggleButton.querySelector('.icon i').classList.add('fa-angle-up');
        } else {
          liberoVideosContent.classList.add('is-hidden');
          liberoVideosToggleButton.querySelector('span:first-child').textContent = 'Show Videos';
          liberoVideosToggleButton.querySelector('.icon i').classList.remove('fa-angle-up');
          liberoVideosToggleButton.querySelector('.icon i').classList.add('fa-angle-down');
        }
      });
    }

    // Code for the three-tier dropdown system
    console.log('Setting up three-tier dropdown system...');
    var datasetSelector = document.getElementById('dataset-selector');
    var taskSelector = document.getElementById('task-selector');
    var videoSelector = document.getElementById('video-selector');
    var demoVideo = document.getElementById('demo-video');

    console.log('Elements found:', {
      datasetSelector: !!datasetSelector,
      taskSelector: !!taskSelector,
      videoSelector: !!videoSelector,
      demoVideo: !!demoVideo
    });

    if (datasetSelector && taskSelector && videoSelector && demoVideo) {
      console.log('All dropdown elements found successfully');
      console.log('Dataset selector:', datasetSelector);
      console.log('Task selector:', taskSelector);
      console.log('Video selector:', videoSelector);
      console.log('Demo video:', demoVideo);
      // Define the task structure for each dataset
      var taskStructure = {
        'libero': {
          'libero_spatial': ['spatial_video1.mp4', 'spatial_video2.mp4'],
          'libero_object': [
            'web_pick_up_the_alphabet_soup_and_place_it_in_the_basket.mp4',
            'web_pick_up_the_bbq_sauce_and_place_it_in_the_basket.mp4',
            'web_pick_up_the_butter_and_place_it_in_the_basket.mp4',
            'web_pick_up_the_chocolate_pudding_and_place_it_in_the_basket.mp4',
            'web_pick_up_the_cream_cheese_and_place_it_in_the_basket.mp4',
            'web_pick_up_the_ketchup_and_place_it_in_the_basket.mp4',
            'web_pick_up_the_milk_and_place_it_in_the_basket.mp4',
            'web_pick_up_the_orange_juice_and_place_it_in_the_basket.mp4',
            'web_pick_up_the_salad_dressing_and_place_it_in_the_basket.mp4',
            'web_pick_up_the_tomato_sauce_and_place_it_in_the_basket.mp4'
          ],
          'libero_goal': ['goal_video1.mp4', 'goal_video2.mp4'],
          'libero_long': ['long_video1.mp4', 'long_video2.mp4']
        },
        'metaworld': {
          'tasks': [
            'button-press-v3_0.mp4',
            'button-press-topdown-v3_0.mp4',
            'button-press-topdown-wall-v3_0.mp4',
            'button-press-wall-v3_0.mp4',
            'coffee-button-v3_0.mp4',
            'coffee-pull-v3_0.mp4',
            'coffee-push-v3_0.mp4',
            'dial-turn-v3_0.mp4',
            'disassemble-v3_0.mp4',
            'door-close-v3_0.mp4',
            'door-open-v3_0.mp4',
            'drawer-close-v3_0.mp4',
            'drawer-open-v3_0.mp4',
            'faucet-close-v3_0.mp4',
            'faucet-open-v3_0.mp4',
            'hammer-v3_0.mp4',
            'handle-press-v3_0.mp4',
            'handle-press-side-v3_0.mp4',
            'handle-pull-v3_0.mp4',
            'handle-pull-side-v3_0.mp4',
            'lever-pull-v3_0.mp4',
            'peg-insert-side-v3_0.mp4',
            'peg-unplug-side-v3_0.mp4',
            'pick-out-of-hole-v3_0.mp4',
            'pick-place-v3_0.mp4',
            'pick-place-wall-v3_0.mp4',
            'plate-slide-v3_0.mp4',
            'plate-slide-back-v3_0.mp4',
            'plate-slide-back-side-v3_0.mp4',
            'plate-slide-side-v3_0.mp4',
            'push-v3_0.mp4',
            'push-back-v3_0.mp4',
            'push-wall-v3_0.mp4',
            'reach-v3_0.mp4',
            'reach-wall-v3_0.mp4',
            'shelf-place-v3_0.mp4',
            'soccer-v3_0.mp4',
            'stick-pull-v3_0.mp4',
            'stick-push-v3_0.mp4',
            'sweep-v3_0.mp4',
            'assembly-v3_0.mp4',
            'basketball-v3_0.mp4',
            'sweep-into-v3_0.mp4',
            'window-close-v3_0.mp4',
            'window-open-v3_0.mp4'
          ]
        },
        'robocasa': {
          'robocasa_task1': ['robocasa_video1.mp4', 'robocasa_video2.mp4'],
          'robocasa_task2': ['robocasa_video3.mp4', 'robocasa_video4.mp4']
        }
      };

      // Function to populate task selector
      function populateTaskSelector(dataset) {
        console.log('Populating task selector for dataset:', dataset);
        taskSelector.innerHTML = '<option value="">Choose task type...</option>';
        videoSelector.innerHTML = '<option value="">Choose video...</option>';
        
        if (dataset && taskStructure[dataset]) {
          console.log('Found tasks for dataset:', Object.keys(taskStructure[dataset]));
          for (var task in taskStructure[dataset]) {
            var option = document.createElement('option');
            option.value = task;
            option.textContent = task.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            taskSelector.appendChild(option);
          }
          taskSelector.disabled = false;
          videoSelector.disabled = true;
          console.log('Task selector enabled, video selector disabled');
        } else {
          taskSelector.disabled = true;
          videoSelector.disabled = true;
          console.log('Both selectors disabled - no dataset or no tasks found');
        }
      }

      // Function to populate video selector
      function populateVideoSelector(dataset, task) {
        console.log('Populating video selector for dataset:', dataset, 'task:', task);
        videoSelector.innerHTML = '<option value="">Choose video...</option>';
        
        if (dataset && task && taskStructure[dataset] && taskStructure[dataset][task]) {
          var videos = taskStructure[dataset][task];
          console.log('Found videos for task:', videos);
          for (var i = 0; i < videos.length; i++) {
            var option = document.createElement('option');
            option.value = videos[i];
            option.textContent = videos[i].replace(/web_|\.mp4/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            videoSelector.appendChild(option);
          }
          videoSelector.disabled = false;
          console.log('Video selector enabled with', videos.length, 'videos');
        } else {
          videoSelector.disabled = true;
          console.log('Video selector disabled - no videos found for this task');
        }
      }

      // Function to load and play video
      function loadVideo(videoFile) {
        if (videoFile) {
          var videoSource = demoVideo.querySelector('source');
          var selectedDataset = datasetSelector.value;
          var selectedTask = taskSelector.value;
          
          if (selectedDataset === 'libero') {
            videoSource.src = './static/videos/libero/libero_object/' + videoFile;
          } else if (selectedDataset === 'metaworld') {
            videoSource.src = './static/videos/metaworld/tasks/' + videoFile;
          } else if (selectedDataset === 'robocasa') {
            videoSource.src = './static/videos/robocasa/' + videoFile;
          }
          
          demoVideo.load();
        }
      }

      // Dataset selector event listener
      datasetSelector.addEventListener('change', function() {
        var selectedDataset = this.value;
        console.log('Dataset selected:', selectedDataset);
        populateTaskSelector(selectedDataset);
        demoVideo.pause();
      });

      // Task selector event listener
      taskSelector.addEventListener('change', function() {
        var selectedDataset = datasetSelector.value;
        var selectedTask = this.value;
        console.log('Task selected:', selectedTask);
        populateVideoSelector(selectedDataset, selectedTask);
        demoVideo.pause();
      });

      // Video selector event listener
      videoSelector.addEventListener('change', function() {
        var selectedVideo = this.value;
        console.log('Video selected:', selectedVideo);
        loadVideo(selectedVideo);
      });

      // Auto-select Libero dataset and libero_object task on page load
      console.log('Initializing dropdowns...');
      datasetSelector.value = 'libero';
      populateTaskSelector('libero');
      taskSelector.value = 'libero_object';
      populateVideoSelector('libero', 'libero_object');
      videoSelector.value = 'web_pick_up_the_alphabet_soup_and_place_it_in_the_basket.mp4';
      loadVideo('web_pick_up_the_alphabet_soup_and_place_it_in_the_basket.mp4');
      console.log('Dropdowns initialized');
    }

});
