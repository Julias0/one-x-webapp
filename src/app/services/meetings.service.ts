import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MeetingDto } from '../models/meeting.dto';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getMeetings() {
    return this.httpClient.get<MeetingDto[]>(environment.ROOT_URL + '/meeting');
  }

  getMeetingWithWhoms(): Observable<string[]> {
    return this.httpClient.get<string[]>(environment.ROOT_URL + '/meeting/with_whom')
  }

  createMeeting(meeting: MeetingDto) {
    return this.httpClient.post(environment.ROOT_URL + '/meeting', meeting);
  }

  getTempates() {
    return [
      {
        header: 'Monthly One-on-one Meeting',
        content: 'A great starting point for monthly 1:1s with your team.',
        longContent: 'This agenda template is a starting point for your monthly 1:1 and should help you lay the foundation for productive conversations with your team!',
        questions: [
          'What was your work and non-work highlight of the past month?',
          'Goals - how are you tracking and feeling about all things numbers/statistics?',
          'What, if anything, feels harder than it should be in your day to day work?',
          'How have you felt about my level of presence/support over the past month?',
          'What is one thing I could experiment with doing differently this month to help you more?',
          'Do you feel you’re getting enough feedback on your work? If not, where would you like more feedback?',
          'What is one thing you’d like to do more of outside of work this coming month?'
        ]
      },
      {
        header: 'Weekly One-on-one Meeting',
        content: 'Use this weekly agenda to have productive 1:1s.',
        longContent: 'Use this weekly agenda to have productive conversations with your team: check in on goals, collect feedback, share wins, detect red flags and more.',
        questions: [
          'What has been the highlight and lowlight of your past week?',
          'Goals - how are you tracking this past week? Any blockers I can help remove?',
          'What, if anything, feels harder than it should be in your day to day work?',
          'If there was one thing I could do differently to help you more, what would it be?',
          'On a scale of 1-10 how happy are you with your work life balance? How can we get closer to 10?'
        ]
      },
      {
        header: 'Skip Level Meeting',
        content: 'This agenda connects senior managers with employees.',
        longContent: 'This agenda helps senior managers connect with employees they don\'t directly manage. The goal is to connect on career progression and strategy.',
        questions: [
          'What are you LEAST clear about – in terms of our strategy and goals?',
          'What professional goals would you like to accomplish in the next six to 12 months, and what makes you say that?',
          'Are you happy in your role? What could make it better for you?',
          'What’s one thing we should start, stop and continue doing as a company?'
        ]
      },
      {
        header: 'Salary Review Meeting',
        content: 'A great salary review conversation needs a solid agenda.',
        longContent: 'Salary review conversations can go really great, or really poorly – it all has to do with what’s on the agenda. Here\'s a template to get you started.',
        questions: [
          'Recap of company compensation philosophy (5 min)',
          'The update (5 min)',
          'The details (10 min)',
          'How does that update feel to you? (10 min)',
          'Questions? (15 min)'
        ]
      },
      {
        header: 'Performance Improvement Plan Meeting',
        content: 'This agenda will help you kick off the PIP process.',
        longContent: 'This agenda template will help you kick off the performance improvement plan process, and ensure you and your employee start the plan on the right foot.',
        questions: [
          'What is a PIP, and why now? (15 min)',
          'Timeline of the PIP process (10 min)',
          'Expectations for each stage (20 min)',
          'Questions and clarifications (15 min)'
        ]
      },
      {
        header: 'Remote One-on-one Meeting',
        content: 'Make the most of remote one-on-ones with this agenda.',
        longContent: 'One-on-one meetings are the most important time you have with your remote team. Make the most of it with this customized one-on-one meeting agenda.',
        questions: [
          'How are things going?',
          'What’s something you’re really jazzed about outside of work?',
          'What have you been working on this week?',
          'What has been the work highlight/lowlight from the past week?',
          'What are you working on next week?',
          'Where do you need help?',
          'Are you happy with our level of communication? How would you change it?',
          'What’s top of mind right now that we haven’t talked about yet?'
        ]
      },
      {
        header: 'Exit Interview Meeting',
        content: 'Use this meeting agenda to collect honest feedback from employees as they exit the company.',
        longContent: 'Exit interviews are an opportunity to get candid, honest feedback from departing teammates. Open the conversation with these starter questions.',
        questions: [
          'What made you look for another job?',
          'Did you feel equipped to do your job well? What could we have done to make it easier for you to do your job?',
          'Were clear goals, expectations and career progression opportunities presented to you?',
          'What would you change about the company or your job?',
          'Would you recommend [insert company name] as a good place to work to friends? Why or why not?',
          'What advice would you give to senior leadership?'
        ]
      },
      {
        header: 'First One-on-one Meeting with a New Employee',
        content: 'Start on the right foot with a new team member using this agenda to kickoff your first one-on-one.',
        longContent: 'Use this meeting agenda to fast-forward through the “get to know you phase” so that you can get right down to having a productive working relationship.',
        questions: [
          'What do you like to do outside of work?',
          'How do you like to communicate? (Phone, email, Slack, etc.)',
          'What time of day do you do your best work?',
          'What kind of projects are you most excited to work on?',
          'What are your 1 year, 3 year, and 5 year career goals?',
          'What does success look like for you in 30 days?',
          'When and how frequently would you like us to have one-on-ones?'
        ]
      },
      {
        header: 'Peer to Peer One-on-one Meeting',
        content: 'Collaborate with your team members using this peer to peer one-on-one meeting.',
        longContent: 'Peer to peer one-on-ones are valuable for cross-departmental teams, feedback and collaboration.',
        questions: [
          'What\'s one thing I can do to make your job easier?',
          'What\'s the biggest challenge you and your team are facing?',
          'What\'s something me or my team can do to improve cross-departmental communication?',
          'What\'s coming down the pipe in the next 3 months that I should know about?'
        ]
      },
      {
        header: 'Sales Leader <> SDR 1:1',
        content: 'Use this agenda to zero in on one thing each SDR can improve each month.',
        longContent: 'Use this template to zero in on one thing each SDR can improve each month - and walk away with a detailed coaching plan.',
        questions: [
          'Qualitative reflection - how do you think you did this month?',
          'Quantitative reflection - review your sales dashboard',
          'Based on your reflections, what’s the one area you want to work on together this month?',
          'Specifically, how do you want me to help you work on this one area?',
          'Schedule coaching sessions for the month'
        ]
      },
      {
        header: 'VP Sales <> Sales Leader 1:1',
        content: 'Created by Mark Roberge, former CRO of HubSpot, use this agenda for VP Sales <> Sales Leader 1:1s.',
        longContent: 'Best used in conjunction with the Sales Manager <> SDR monthly 1:1 template, this agenda will keep you in the loop on SDR development plans.',
        questions: [
          'Diagnosis - what issue will you coach this SDR on this month?',
          'Coaching plan - how will you help them hit their goal(s)?',
          'Measuring the impact - how will you know you’ve been successful?'
        ]
      },
      {
        header: 'Bi-Weekly Sales One-on-One',
        content: 'A bi-weekly 1:1 stand-up for sales managers to sync with direct reports.',
        longContent: 'This bi-weekly 1:1 sales stand-up agenda ensures that a direct report is clear on what will be covered and how to prepare. ?',
        questions: [
          'What were the deliverables from last week and did you achieve them?',
          'If yes, what were the best practices that you used?',
          'If no, what were your biggest blockers and what solutions have you thought about?',
          'Pipeline and metrics discussion',
          'Important updates (managerial + company and how they affect you)',
          'What can I unblock for you?',
          'Are you happy/unhappy ? Any feedback for me?',
          'What are the deliverables for next week + what check ins do we need to schedule before our next 1:1?'
        ]
      },
      {
        header: 'OKR Goal Setting One-on-one Meeting',
        content: 'Use this 1:1 meeting agenda to set OKRs for the upcoming quarter.',
        longContent: 'Objectives and key results should be clearly defined and communicated. This agenda will help teams prepare, strategize and prioritize goals for the quarter.',
        questions: [
          'OKR review for last quarter: Where did we succeed? Where did we fall short? What did we learn?',
          'What are 3-5 things you want to accomplish in the next quarter?',
          'What key things need to happen in order to achieve those 3-5 goals?',
          'What resources, tools and budget do you need to achieve your goals?',
          'What could happen in the upcoming quarter that would prevent you from hitting your goals?'
        ]
      },
      {
        header: 'SaaS High Growth Sales One-on-one Meeting',
        content: 'SaaS sales is a fast moving, high pressure role. Monitor pipelines and performance with this agenda.',
        longContent: 'This meeting agenda will help you uncover roadblocks, areas of improvement, and help facilitate two-way feedback so you can build trust with your team while giving them the knowledge and resources they need to hit targets and succeed.',
        questions: [
          'Icebreaker - Let’s pick a question from Soapbox’s suggestions, and discuss!',
          'Learning of the week - both positive and negative, what did we learn about our skills or customers/product/market?',
          'Stats - How’s pipe looking? How do you feel about conversion rates?',
          'Improve - Based on your reflection, what do you think we should focus on this week to improve?',
          '2-way Candid Feedback - What’s 1 thing each of us should either stop doing, start doing, or keep doing?'
        ]
      },
      {
        header: 'Quarterly Mentor Mentee One-on-one Meeting',
        content: 'Focus on developing your skills and career with this quarterly one-on-one meeting agenda.',
        longContent: 'One-on-one time between mentors and mentees is often infrequent but powerful. Maximize your time together using this 60 minute agenda.',
        questions: [
          'What\'s new since we last spoke in your personal and professional life?',
          'Networking opportunities',
          'Professional and/or workplace challenges',
          'When should we meet next?'
        ]
      },
      {
        header: 'Quarterly Performance Review Meeting',
        content: 'Identify strengths, weaknesses, opportunities to grow and more with this quarterly review.',
        longContent: 'Come prepared with manager feedback, self-assessments, and peer feedback to ensure this performance review meeting\'s success.',
        questions: [
          'Self assessment and peer feedback review',
          'Performance against objectives',
          'Wins, strengths and opportunities to grow',
          'Areas for improvement',
          'Concerns, questions and clarification'
        ]
      },
      {
        header: 'Bi-weekly Key Account Check-in Meeting',
        content: 'Account managers and supervisors use this agenda to identify risk and opportunities in portfolios.',
        longContent: 'This bi-weekly 1:1 sales stand-up agenda ensures that a direct report is clear on what will be covered and how to prepare. ?',
        questions: [
          'Have any key accounts gone dark in the past two weeks?',
          'Which accounts are you most worried about and why?',
          'What key accounts have potential for growth in the next month?',
          'How are you managing time and workload across your accounts?',
          'Are there any areas where you need more support and/or resources?'
        ]
      },
      {
        header: 'Heather Foeh\'s One-on-one Meeting',
        content: 'Heather Foeh, VP of Customer Experience at PathFactory, uses this 1:1 agenda to sync with her team.',
        longContent: 'Start with a few non-work-related questions to reinforce a personal connection, then help prioritize their day-to-day work and see where support is needed.',
        questions: [
          'What did you do this weekend?',
          'Do you have any fun trips coming up?',
          'What’s your top priority for the week?',
          'What’s holding you back at work right now?',
          'What’s the thing that’s in your way right now?',
          'What’s going well?',
          'What are you struggling to accomplish by the end of the quarter?',
          'How can I help you?'
        ]
      },
      {
        header: 'Jason Ball\'s One-on-one Meeting',
        content: 'Jason Ball, Customer Support Manager at Intercom, asks these 5 questions in one-on-one meetings.',
        longContent: 'Jason Ball, Customer Support Manager at Intercom, engages his support team by asking these top 5 questions in one-on-one meetings.',
        questions: [
          'How\'s life?',
          'KPIs - how’d you do last week? Where do you need to focus more this week?',
          'How are your 10% time projects coming along? What can I do to support?',
          'What’s felt harder than it needs to be in the last week? How can I help?',
          'Feedback - any feedback for you, any feedback for me?'
        ]
      },
      {
        header: 'Offboarding One-on-one Meeting (manager-employee)',
        content: 'A final one-on-one between managers and a departing direct report.',
        longContent: 'Offboarding is so important to maintaining a positive relationship between employees and organizations. It\'s also a great way for companies and managers to improve. But, this shouldn\'t just be something that HR is responsible for, but managers too.',
        questions: [
          'Has all of the knowledge transfer been completed?',
          'Is there anything we should be aware of as we take over your responsibilities?',
          'If we could improve in any way, how would we do it?',
          'Did the job live up to your expectations?',
          'What was the most enjoyable part of your job?',
          'What qualities and skills should someone have to be successful in your role?',
          'Who do you feel is doing an outstanding job on the team?'
        ]
      },
      {
        header: 'Kim Scott\'s Radical Candor™ One-on-one',
        content: 'Bring kindness, clarity, specificity and sincerity to your one-on-ones.',
        longContent: 'Kim Scott, executive coach and author of Radical Candor ™, shares her framework and approach for one-on-one meetings. Use these questions as a jumping off point for your next one-on-one.',
        questions: [
          'What\'s on your mind this week?',
          'How happy were you this past week?',
          'How productive were you this past week?',
          'What feedback do you have for me?'
        ]
      },
      {
        header: 'Biannual Performance Review',
        content: '6-month performance review. Check in on progress, strengths, and areas for improvement.',
        longContent: '6-month check in for managers and employees to talk about strengths, areas for improvement, impact, and career goals.',
        questions: [
          'Performance against team and individual goals',
          'Ability to live out company values',
          'Major accomplishments in the last 6 months',
          'Discuss your strengths (manager and peer feedback)',
          'Discuss your areas for improvement (manager and peer feedback)',
          'What\'s needed to help you improve?',
          'What are your professional goals for the next 6 months? Year?'
        ]
      }
    ]
  }
}
